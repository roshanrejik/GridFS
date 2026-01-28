const express = require('express');
const router = express.Router();
const {
    register,
    login,
    getProfile,
    updateProfile,
    getAllUsers
} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);
router.get('/profile/:id', getProfile);
router.put('/profile/:id', updateProfile);

module.exports = router;
