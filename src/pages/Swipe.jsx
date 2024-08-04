import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import Navbar from "../components/navbar";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "../styles/pages/Swipe.scss";
import { supabase } from '../createClient';

const Swipe = () => {
    const [characters, setCharacters] = useState([]);
    const [lastDirection, setLastDirection] = useState(null);
    const [userId, setUserId] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            const { data: session, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) {
                console.error('Error fetching session:', sessionError.message);
                navigate('/');
                return;
            }

            if (session && session.session) {
                const user = session.session.user;
                setUserId(user.id);

                // Since there's no 'auth' table, we'll just log the user data
                console.log('User ID:', user.id);
                console.log('User Name:', user.user_metadata?.name || 'No Name');
            } else {
                // No session means user is not authenticated
                navigate('/');
            }
        };

        const fetchData = async () => {
            const { data, error } = await supabase
                .from('prodata')
                .select('*');

            if (error) {
                console.error('Error fetching data:', error.message);
            } else {
                console.log('Fetched data:', data);
                setCharacters(data);
            }
        };

        checkAuth();
        fetchData();
    }, [navigate]);

    const swiped = async (direction, product) => {
        console.log('removing:', product.name);
        setLastDirection(direction);
        if (direction === 'up' && userId) {
            console.log('Adding to cart:', product);

            const { data, error } = await supabase
                .from('cart')
                .upsert([
                    { user_id: userId, product_id: product.id }
                ], { onConflict: ['user_id', 'product_id'] });

            if (error) {
                console.error('Error adding to cart:', error.message);
            } else {
                console.log('Product added to cart:', data);
            }

            dispatch({ type: 'ADD_TO_CART', payload: product });
        }
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
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
                                key={character.id}
                                onSwipe={(dir) => swiped(dir, character)}
                                onCardLeftScreen={() => outOfFrame(character.name)}
                            >
                                <div
                                    style={{
                                        backgroundImage: `url(${character.url})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center'
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
            </div>
        </>
    );
};

export default Swipe;
