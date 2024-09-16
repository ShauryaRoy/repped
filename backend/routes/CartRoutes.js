const express = require('express');
const { addToCart, getFromCart, decreaseQuantity, removeFromCart, clearCart } = require('../controllers/CartController');
const verifyToken = require('../middleware/verifyToken'); // Middleware to extract userId

const router = express.Router();

router.post('/', verifyToken, addToCart);
router.get('/', verifyToken, getFromCart);
router.put('/decrease', verifyToken, decreaseQuantity); // Decrease quantity of a product
router.delete('/remove', verifyToken, removeFromCart); // Remove product entirely from cart
router.delete('/clear', verifyToken, clearCart); // Clear entire cart

module.exports = router;
