import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
    const cartItems = useSelector(state => state.cart);

    return (
        <div>
            <h2>Your Cart</h2>
            <ul>
                {cartItems.map((item, index) => (
                    <li key={index} style={{ display: 'flex', marginBottom: '20px' }}>
                        <img src={item.url} alt={item.name} style={{ width: '100px', marginRight: '20px' }} />
                        <div>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>Price: ₹{item.price}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
