import { useState } from 'react';
import React from 'react';
import Navbar from "../components/navbar.jsx";
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import TinderCard from 'react-tinder-card';
import { useDispatch } from 'react-redux'; // Import useDispatch

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Convergence&display=swap');
`;
const DownArrowIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-chevron-down"
    >
        <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
);
const Home = () => {
    const [lastDirection, setLastDirection] = useState(); // useState inside component
    const dispatch = useDispatch(); // useDispatch inside component

    const swiped = (direction, product) => {
        console.log('removing:', product.name);
        setLastDirection(direction);
        if (direction === 'up') {
            console.log('Adding to cart:', product); // Debug log
            dispatch({ type: 'ADD_TO_CART', payload: product });
        }
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };

    const HeroBody = styled.div`
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        grid-template-rows: repeat(100, 8px);
        /* height: 100vh; */
    `;
    const CardContainer = styled.div`
        grid-column: 9 / 11;
        grid-row: 10/ 20;
        width: 100%;
        max-width: 400px;
        overflow-x: hidden; /* Prevent horizontal expansion but allow vertical scrolling */
    `
    const ShopButton = styled.div`
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1em; /* Adjusted font-size for container */
        background-color: black;
        height: 50px;
        width: 200px;
        grid-column: 2;
        border-radius: 40px;
        grid-row: 50 / 60;
        svg {
        fill: white;
        position: absolute;
        bottom: 10px; 
        left: 50%; 
        transform: translateX(-50%); 
    }
        button {
            font-size: 1.2em; /* Adjusted font size for button text */
            background-color: transparent;
            color: white;
            border: none;
            cursor: pointer;
            outline: none;
        }
    
        button:hover {
            color: #ccc;
        }`


    const HeroText = styled.h1`
        font-size: 96px;
        grid-column: 2 / 7;
        grid-row: 10 / 20;
        font-family: 'Convergence', sans-serif;
    `;

    const DisplayCard = styled.div`
        grid-column: 7 / 13;
    `;

    const characters = [
        {
            name: 'Wide pull-on trousers',
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus nemo labore suscipit laboriosam sint reiciendis sit praesentium aliquam perferendis placeat.",
            url: "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F3a%2Fac%2F3aac9ce917c406a1bb4f4bbb9fa78284dd220b05.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
            price: 1999

        },
        {
            name: 'Drawstring-detail cotton dress',
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus nemo labore suscipit laboriosam sint reiciendis sit praesentium aliquam perferendis placeat.",
            url: "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2Fd6%2F93%2Fd693159e7233ae30e1f94bf9fb214690073e09ec.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
            price: 1999

        },
        {
            name: 'Ribbed button-front top',
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus nemo labore suscipit laboriosam sint reiciendis sit praesentium aliquam perferendis placeat.",
            url: "https://lp2.hm.com/hmgoepprod?set=format%5Bwebp%5D%2Cquality%5B79%5D%2Csource%5B%2F08%2Fbe%2F08be6a14c4ff45188cf5402d50f3bc115a8030f2.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url%5Bfile%3A%2Fproduct%2Fmain%5D",
            price: 1999

        },
        {
            name: 'Jersey halterneck top',
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus nemo labore suscipit laboriosam sint reiciendis sit praesentium aliquam perferendis placeat.",
            url: "https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2Fcf%2F63%2Fcf6320c8561fe437acd9be4420ad4b15495646f5.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]",
            price: 1999

        },
    ]


    return (
        <>
            <Navbar AuthToken />
            <HeroBody>
                <HeroText>
                    Swipe Your Way
                    To Shop
                </HeroText>

                <CardContainer className="card-container">
                    {characters.map((character) => (
                        <TinderCard
                            className='swipe'
                            key={character.name}
                            onSwipe={(dir) => swiped(dir, character)}
                            onCardLeftScreen={() => outOfFrame(character.name)}
                        >
                            <div
                                style={{
                                    backgroundImage: `url(${character.url})`
                                }}
                                className='card'
                            >
                                {/* <h3 className='name'>{character.name}</h3> */}
                            </div>
                        </TinderCard>
                    ))}
                </CardContainer>
                <ShopButton>
                    <button type="submit">Shop</button>
                    <DownArrowIcon />
                </ShopButton>
            </HeroBody >

        </>
    );
};

export default Home;
