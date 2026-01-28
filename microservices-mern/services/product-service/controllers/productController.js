const Product = require('../models/Product');

// @desc    Create product
// @route   POST /products
// @access  Public
exports.createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get all products
// @route   GET /products
// @access  Public
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Get single product
// @route   GET /products/:id
// @access  Public
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Update product
// @route   PUT /products/:id
// @access  Public
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Delete product
// @route   DELETE /products/:id
// @access  Public
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// @desc    Check product availability
// @route   GET /products/:id/availability
// @access  Public
exports.checkAvailability = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const quantity = parseInt(req.query.quantity) || 1;
        const available = product.stock >= quantity;

        res.status(200).json({
            success: true,
            available,
            stock: product.stock,
            requested: quantity
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
