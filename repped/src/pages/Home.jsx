import React from 'react'
import Navbar from "../components/navbar.jsx"
import "../styles/pages/Home.scss"
import { Link } from "react-router-dom"
const Home = () => {
    return (
        <>
            <Navbar AuthToken />
            <section className='homeSection'>
                <div className='homeSection__container'>
                    <div className="homeSection__container__text__header">
                        <h1 className='heading'>Tinder For <span>Clothing</span> </h1>
                    </div>
                    <div className='get-started-button'>
                        <Link to="/swipenow"><button type="button">Get Started</button></Link>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home