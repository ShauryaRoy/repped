import React, { useState, useEffect } from 'react';
import '../styles/components/Navbar.scss';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const NavbarPostlogin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) return; 
                
                const response = await axios.get('http://localhost:5000/cart', {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                });

                if (response.status === 200 && response.data.productIds) {
                    setCartCount(response.data.productIds.length); 
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems(); 
    }, []); 

    return (
        <section className='navbarSection'>
            <ul>
                <li className='logoname'>
                    <Link to="/swipenow">Repped</Link>
                </li>
                <button className='hamburger' onClick={toggleMenu}>
                    &#9776;
                </button>
                <div className={`navLinks ${isOpen ? 'open' : ''}`}>
                    <li>
                        {/* The sidebar toggle is now handled on the Profile link click */}
                        <Link to="/profile" onClick={toggleMenu}>Profile</Link>
                    </li>
                    <li>
                        <Link to="/newsletter_signup">Newsletter</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart {cartCount}</Link>
                    </li>
                </div>
            </ul>
        </section>
    );
}

export default NavbarPostlogin;
