import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { supabase } from '../createClient'; // Import your Supabase client
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                // Get the current user session
                const { data: session, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;
                if (!session || !session.session) {
                    navigate('/');
                    return;
                }

                const userId = session.session.user.id;

                // Fetch cart items for the current user
                const { data: cartData, error: cartError } = await supabase
                    .from('cart')
                    .select('product_id')
                    .eq('user_id', userId);

                if (cartError) throw cartError;

                // Extract product IDs from cart items
                const productIds = cartData.map(item => item.product_id);

                // Fetch product details for the product IDs
                const { data: productData, error: productError } = await supabase
                    .from('prodata')
                    .select('*')
                    .in('id', productIds);

                if (productError) throw productError;

                setCartItems(cartData);
                setProducts(productData);
            } catch (error) {
                console.error('Error fetching cart or product data:', error.message);
                navigate('/');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [navigate]);

    const cartItemsWithDetails = cartItems.map(item => {
        const product = products.find(p => p.id === item.product_id);
        return product || {}; // Ensure a default empty object if no product found
    });

    return (
        <div>
            <h2>Your Cart</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {cartItemsWithDetails.map((item, index) => (
                        item.id ? (
                            <li key={index} style={{ display: 'flex', marginBottom: '20px' }}>
                                <img src={item.url} alt={item.name} style={{ width: '100px', marginRight: '20px' }} />
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
