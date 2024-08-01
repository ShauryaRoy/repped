import React, { useState } from 'react';
import '../styles/components/Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = (AuthToken) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cartNumber, setcartNumber] = useState(0)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
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
                        <Link to="/swipeNow">SwipeNow  </Link>
                    </li>
                    {<li>
                        <Link to="/auth">Login</Link>
                    </li>}
                    <li>
                        {/* have to create on boarding inside profile page */}
                        <Link to="/onboarding">Profile</Link>
                    </li>
                    <li>
                        <Link to="/newsletter_signup">Newsletter</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart {cartNumber}</Link>
                    </li>
                </div>
            </ul>
        </section>
    );
}

export default Navbar;
