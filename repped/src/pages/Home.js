import React, { useEffect } from 'react'
import Navbar from '../components/navbar'
import Explore from '../pages/Explore'
import Catalogue from './Catalogue'
import Footer from "./Footer"
import Contact from "./Contact"
import gsap from "gsap"

const Home = () => {
    useEffect(() => {
        gsap.to("#animated-text", {
            backgroundPosition: "200%",
            duration: 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true
        });
    }, []);

    return (

        <>
            <Navbar />
            <section className='overflow-x-hidden'>
                <div className="w-[90%] h-[600px] mx-auto bg-black rounded-2xl flex flex-col justify-center pl-7">
                    <h1 className="text-5xl sm:text-6xl md:text-6xl  lg:text-6xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-transparent bg-[length:200%_100%]" id="animated-text">
                        Represent
                    </h1>



                    <h1 className="text-5xl  md:text-6xl  lg:text-6xl xl:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-transparent bg-[length:200%_100%]" id="animated-text">
                        Yourself</h1>


                    <button className="bg-white rounded mt-10 ml-4 text-black">Swipe now</button>
                </div>
                <div className='overflow-hidden mt-10'>
                    <div className='flex space-x-8 animate-scroll'>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Party Wear</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Tops & T-Shirts</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Blouses & Shirts</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Dresses</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Skirts</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Jeans & Pants</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Leggings & Jeggings</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Ethnic Wear</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Sweaters & Cardigans</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Office Wear</div>
                        <div className="flex-none px-4 py-2 border-2 border-black rounded-lg">Vacation Outfits</div>
                    </div>
                </div>

            </section>
            <Explore />
            <Catalogue />
            <Contact />
            <Footer />
        </>
    )
}

export default Home