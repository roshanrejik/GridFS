const Order = require('../models/Order');
const axios = require('axios');

const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL;

// @desc    Create order
// @route   POST /orders
// @access  Public
exports.createOrder = async (req, res) => {
    try {
        const { userId, items, shippingAddress } = req.body;

        // Verify user exists
        try {
            await axios.get(`${USER_SERVICE_URL}/api/users/profile/${userId}`);
        } catch (error) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify products and calculate total
        let totalAmount = 0;
        const orderItems = [];

        for (const item of items) {
            try {
                // Get product details
                const productResponse = await axios.get(
                    `${PRODUCT_SERVICE_URL}/api/products/${item.productId}`
                );
                const product = productResponse.data.product;

                // Check availability
                const availabilityResponse = await axios.get(
                    `${PRODUCT_SERVICE_URL}/api/products/${item.productId}/availability?quantity=${item.quantity}`
                );

                if (!availabilityResponse.data.available) {
                    return res.status(400).json({
                        error: `Product ${product.name} is not available in requested quantity`
                    });
                }

                // Add to order items
                orderItems.push({
                    productId: product._id,
                    productName: product.name,
                    quantity: item.quantity,
                    price: product.price
                });

                totalAmount += product.price * item.quantity;
            } catch (error) {
                return res.status(404).json({
                    error: `Product ${item.productId} not found`
                });
            }
        }

        // Create order
        const order = await Order.create({
            userId,
            items: orderItems,
            totalAmount,
            shippingAddress,
            status: 'pending'
        });

        res.status(201).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get all orders
// @route   GET /orders
// @access  Public
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single order
// @route   GET /orders/:id
// @access  Public
exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get user orders
// @route   GET /orders/user/:userId
// @access  Public
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update order status
// @route   PUT /orders/:id/status
// @access  Public
exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            order
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Cancel order
// @route   DELETE /orders/:id
// @access  Public
exports.cancelOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status: 'cancelled', updatedAt: Date.now() },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Order cancelled successfully',
            order
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
