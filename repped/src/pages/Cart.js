import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/NavbarPostLogin.js'
const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/');
                    return;
                }

                // Fetch cart items from the backend
                const cartResponse = await axios.get('http://localhost:5000/cart', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const cartData = cartResponse.data;
                const productIds = cartData.productIds;

                // Fetch product details from the backend using product IDs
                const productResponse = await axios.post('http://localhost:5000/products/bulk', {
                    productIds: productIds,
                });

                const productData = productResponse.data;
                setCartItems(cartData.productIds); // Set product IDs
                setProducts(productData); // Set products fetched by product IDs
            } catch (error) {
                console.error('Error fetching cart or product data:', error.message);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [navigate]);

    const cartItemsWithDetails = cartItems.map(productId => {
        const product = products.find(p => p._id === productId);
        return product || {}; // Default to an empty object if no product found
    });

    return (
        <div>
            <Navbar />
            <h2>Your Cart</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {cartItemsWithDetails.map((item, index) => (
                        item._id ? (
                            <li key={index} style={{ display: 'flex', marginBottom: '20px' }}>
                                <img src={item.productURL} alt={item.name} style={{ width: '100px', marginRight: '20px' }} />
                                <div>
                                    <h3>{item.name}</h3>
                                    <p>{item.description}</p>
                                    <p>Price: ₹{item.price}</p>
                                </div>
                            </li>
                        ) : null
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Cart;
