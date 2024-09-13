import { useState } from 'react';

import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import TinderCard from 'react-tinder-card';

const AboutSection = styled.div`
    display: grid;
    grid-template-columns: repeat(12,1fr);
    grid-template-rows: repeat(200, 4px);
    height: 100vh;
    padding-top: 10em;
    width: 100%; 
    margin: 0 auto;   
`;
const CardContainer = styled.div`
    grid-column: 2;
    grid-row: 20;
    width: 100%;
    max-width: 400px; 
    overflow-x: hidden; 
`;
const AboutPageHeader = styled.h1`
    grid-column: 7/span 9;
    grid-row: 25;
    font-size: 3em;
    font-family: 'Convergence', sans-serif;
    font-weight: 1000;


`
const AboutDetails = styled.div`
    grid-column: 7/span 10;
    grid-row: 55;
    font-size: 2em;
    font-family: 'Convergence', sans-serif;

`
const SizeChart = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: repeat(50, 4px);
    grid-column: 8/11;
    grid-row: 110/170;
    border-radius: 20px;
    /* height: 15em;
    width: 10em; */
    background-color: darkgray;
`
const InsideSizeChart = styled.div`
    grid-column: 2/ span 8;
    font-size: 1.5em;
    font-family: 'Convergence', sans-serif;

    &:nth-child(1){
        grid-row: 15;
    }
    &:nth-child(3){
        grid-row: 23;
    }
    &:nth-child(5){
        grid-row: 32;
    }
`
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

const About = () => {

    const [lastDirection, setLastDirection] = useState();
    const dispatch = useDispatch();
    const swiped = (direction, product) => {
        console.log('removing:', product.name);
        setLastDirection(direction);
        if (direction === 'up') {
            console.log('Adding to cart:', product);
            dispatch({ type: 'ADD_TO_CART', payload: product });
        }
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!');
    };


    return (
        <AboutSection>
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
                        </div>
                    </TinderCard>
                ))}
            </CardContainer>

            <AboutPageHeader>
                Product Details
            </AboutPageHeader>
            <AboutDetails>
                Product Name: Repped <br /> <br />
                Product Material: Love For Shopping <br /> <br />
                Size Chart:
            </AboutDetails>


            <SizeChart>
                <InsideSizeChart>
                    Date Nights : Swipe Now
                </InsideSizeChart>
                <br />
                <InsideSizeChart>

                    Concerts : Swipe Now
                </InsideSizeChart>
                <br />
                <InsideSizeChart>

                    Ethnic : Swipe Now
                </InsideSizeChart>
            </SizeChart>
        </AboutSection>
    );

}

export default About;
