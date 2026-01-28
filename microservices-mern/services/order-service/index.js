const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Order Service: MongoDB Connected'))
    .catch((err) => console.error('❌ Order Service: MongoDB Connection Error:', err));

// Routes
app.use('/api', orderRoutes);

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        service: 'Order Service',
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
    console.log(`🚀 Order Service running on port ${PORT}`);
});
