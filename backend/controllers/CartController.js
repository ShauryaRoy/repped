const Cart = require('../models/Cart');


exports.addToCart = async (req, res) => {
    try {
        const userId = req.userId; // Extracted from token middleware
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({ message: 'Product ID is required' });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Create new cart if it doesn't exist
            cart = new Cart({
                userId,
                products: [{ productId, quantity: 1 }]
            });
        } else {
            // Check if the product is already in the cart
            const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

            if (productIndex !== -1) {
                // Product already in cart, increment quantity
                cart.products[productIndex].quantity += 1;
            } else {
                // Add new product to cart
                cart.products.push({ productId, quantity: 1 });
            }
        }

        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding product to cart' });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        cart.products.splice(productIndex, 1); // Remove the product entirely
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing product from cart' });
    }
};

exports.decreaseQuantity = async (req, res) => {
    try {
        const userId = req.userId;
        const { productId } = req.body;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        if (cart.products[productIndex].quantity > 1) {
            cart.products[productIndex].quantity -= 1; // Decrease quantity by 1
            await cart.save();
            return res.status(200).json(cart);
        } else {
            return res.status(400).json({ message: 'Quantity cannot be decreased below 1. Use removeFromCart to remove the product.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error decreasing quantity' });
    }
};



exports.clearCart = async (req, res) => {
    try {
        const userId = req.userId;

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.products = []; // Clear the products array
        await cart.save();

        res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error clearing cart' });
    }
};


exports.getFromCart = async (req, res) => {
    try {
        const userId = req.userId;
        const cart = await Cart.findOne({ userId }).populate('products.productId');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving cart' });
    }
};
