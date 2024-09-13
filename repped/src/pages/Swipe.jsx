import { useState } from 'react';
import TinderCard from 'react-tinder-card';
import Navbar from "../components/navbar"
import { useDispatch } from 'react-redux'; // Import useDispatch from Redux
import "../styles/pages/Swipe.scss"
// import MatchContainer from './MatchContainer';

const db = [
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

const Swipe = () => {
    const characters = db
    const [lastDirection, setLastDirection] = useState()
    const dispatch = useDispatch(); // Initialize dispatch

    const swiped = (direction, product) => {
        console.log('removing:', product.name);
        setLastDirection(direction);
        if (direction === 'up') {
            console.log('Adding to cart:', product); // Debug log
            dispatch({ type: 'ADD_TO_CART', payload: product });
        }
    };

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <>
            <Navbar />
            {/* <MatchContainer /> */}
            <div className="dashboard">

                <div className="swiper-container">
                    <div className="card-container">
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
                                    <h3 className='name'>{character.name}</h3>
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
