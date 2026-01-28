const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Product Service: MongoDB Connected'))
    .catch((err) => console.error('❌ Product Service: MongoDB Connection Error:', err));

// Routes
app.use('/api', productRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        service: 'Product Service',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`🚀 Product Service running on port ${PORT}`);
});
