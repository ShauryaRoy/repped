import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Navbar from "../components/NavbarPostLogin.js";
import "../styles/pages/Swipe.scss";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { handleSuccess, handleError } from '../utils';
import { ToastContainer } from 'react-toastify';

const Swipe = () => {
  const [characters, setCharacters] = useState([]);
  const [lastDirection, setLastDirection] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setCharacters(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        handleError("User is not logged in");
        return;
      }

      // Send the POST request to add the product to the cart
      const response = await fetch('http://localhost:5000/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send token in Authorization header
        },
        body: JSON.stringify({ productId }), // Send productId in the body
      });

      if (response.ok) {
        handleSuccess('Product added to cart');
      } else {
        const result = await response.json();
        handleError(result.message || 'Error adding product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      handleError('Error adding product to cart');
    }
  };


  const swiped = (direction, product) => {
    setLastDirection(direction);
    if (direction === 'up') {
      addToCart(product._id); // Pass the product ID to addToCart
    }
  };

  const outOfFrame = (name) => {
    console.log(`${name} left the screen!`);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="swiper-container">
          <div className="card-container">
            {characters.map((character) => (
              <TinderCard
                className='swipe'
                key={character._id}
                onSwipe={(dir) => swiped(dir, character)}
                onCardLeftScreen={() => outOfFrame(character.name)}
              >
                <div
                  style={{
                    backgroundImage: `url(${character.productURL})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '400px',
                    width: '300px',
                  }}
                  className='card'
                >
                  <h3 className='name'>{character.name}</h3>
                  <p>{character.description}</p>
                  <p>Price: ${character.price}</p>
                </div>
              </TinderCard>
            ))}
            <div className="swipe-info">
              {lastDirection ? (
                <p>You swiped {lastDirection}</p>
              ) : (
                <p />
              )}
            </div>
          </div>
        </div>
        <button onClick={handleLogout}>Log Out</button>
        <ToastContainer />
      </div>
    </>
  );
};

export default Swipe;
