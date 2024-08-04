import React, { useState, useEffect } from 'react';
import '../styles/components/Navbar.scss';
import { Link } from 'react-router-dom';
import { supabase } from '../createClient';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const fetchCartCount = async () => {
            try {
                const { data: session, error: sessionError } = await supabase.auth.getSession();
                if (sessionError) throw sessionError;
                if (!session || !session.session) {
                    setCartCount(0);
                    return;
                }

                const userId = session.session.user.id;
                const { count, error: countError } = await supabase
                    .from('cart')
                    .select('user_id', { count: 'exact' }) // Count rows where user_id matches
                    .eq('user_id', userId);

                if (countError) {
                    console.error('Error fetching cart count:', countError.message);
                    setCartCount(0);
                } else {
                    setCartCount(count || 0); // Set count, default to 0 if count is null
                }
            } catch (error) {
                console.error('Error fetching user session:', error.message);
                setCartCount(0);
            }
        };

        fetchCartCount();
    }, []); // Empty dependency array means this will run once on component mount

    return (
        <section className='navbarSection'>
            <ul>
                <li className='logoname'>
                    <Link to="/">Repped</Link>
                </li>
                <button className='hamburger' onClick={toggleMenu}>
                    &#9776;
                </button>
                <div className={`navLinks ${isOpen ? 'open' : ''}`}>
                    <li>
                        <Link to="/swipeNow">SwipeNow</Link>
                    </li>
                    <li>
                        <Link to="/auth">Login</Link>
                    </li>
                    <li>
                        <Link to="/onboarding">Profile</Link>
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

export default Navbar;
