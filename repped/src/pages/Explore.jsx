import React from 'react'
import image1 from '../images/image1.jpg'
import image2 from '../images/image2.jpg'

const Explore = () => {

    return (
        <>
            <section className='mt-12 flex justify-center h-auto'>
                <div className='flex flex-col md:flex-row mx-auto space-y-8 md:space-y-0 md:space-x-8 max-w-full'>
                    {/* Left Block */}
                    <div className="h-[20em] md:h-[30em] rounded-lg border-2 border-black bg-black w-full md:w-[40em] flex justify-center items-center relative overflow-hidden group">
                        <div className="absolute inset-0 bg-purple-500 transform translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
                        <div className="relative z-10 text-white">Hover Me</div>
                    </div>

                    {/* Center Column */}
                    <div className='flex flex-col'>
                        <div className='flex flex-col space-y-2'>
                            {/* First Block */}
                            <div className='border-2 border-black rounded-lg h-[15em] w-full md:w-[20em] bg-black flex items-center justify-center relative overflow-hidden group'>
                                {/* Sliding background */}
                                <div className="absolute inset-0 bg-purple-500 transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
                                {/* Content */}
                                <p className='text-white text-2xl font-convergence p-4 text-center relative z-10'>
                                    The new way of <br /> Shopping
                                </p>
                            </div>

                            {/* Second Block */}
                            <div className='border-2 border-black rounded-lg h-[14.5em] w-full md:w-[20em] bg-black flex items-center justify-center relative overflow-hidden group'>
                                {/* Sliding background */}
                                <div className="absolute inset-0 bg-purple-500 transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"></div>
                                {/* Content */}
                                <p className='text-white text-2xl font-convergence p-4 text-center relative z-10'>
                                    Another Block
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Block (Image) - Hidden on smaller screens */}
                    <div className='h-[30em] w-full md:w-[20em] flex justify-center items-center hidden md:flex'>
                        <img className='object-cover h-[30em] rounded-lg' src={image2} alt="" />
                    </div>
                </div>
            </section>
        </>
    )
}

export default Explore
