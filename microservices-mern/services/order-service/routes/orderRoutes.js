const express = require('express');
const router = express.Router();
const {
    createOrder,
    getAllOrders,
    getOrder,
    getUserOrders,
    updateOrderStatus,
    cancelOrder
} = require('../controllers/orderController');

router.post('/orders', createOrder);
router.get('/orders', getAllOrders);
router.get('/orders/:id', getOrder);
router.get('/orders/user/:userId', getUserOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.delete('/orders/:id', cancelOrder);

module.exports = router;
