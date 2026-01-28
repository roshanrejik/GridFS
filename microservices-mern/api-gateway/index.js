const express = require('express');
const cors = require('cors');
require('dotenv').config();

const createProxyMiddleware = require('./middleware/proxy');
const rateLimiter = require('./middleware/rateLimiter');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Request logging
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});

// Service URLs
const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL;

// Routes - Proxy to microservices

// User Service Routes
app.use('/api/users', createProxyMiddleware(USER_SERVICE_URL));

// Product Service Routes
app.use('/api/products', createProxyMiddleware(PRODUCT_SERVICE_URL));

// Order Service Routes
app.use('/api/orders', createProxyMiddleware(ORDER_SERVICE_URL));

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        service: 'API Gateway',
        status: 'healthy',
        timestamp: new Date().toISOString(),
        services: {
            userService: USER_SERVICE_URL,
            productService: PRODUCT_SERVICE_URL,
            orderService: ORDER_SERVICE_URL
        }
    });
});

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Microservices API Gateway',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            products: '/api/products',
            orders: '/api/orders',
            health: '/health'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.originalUrl
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 API Gateway running on port ${PORT}`);
    console.log(`📡 Proxying to:`);
    console.log(`   - User Service: ${USER_SERVICE_URL}`);
    console.log(`   - Product Service: ${PRODUCT_SERVICE_URL}`);
    console.log(`   - Order Service: ${ORDER_SERVICE_URL}`);
});
