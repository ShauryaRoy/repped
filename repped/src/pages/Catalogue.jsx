import React from "react"
import image1 from "../images/catalogue/hmgoepprod.jpeg"
import image2 from "../images/catalogue/hmgoepprod 1.jpeg"
import image3 from "../images/catalogue/hmgoepprod 2.jpeg"
import image4 from "../images/catalogue/hmgoepprod 3.jpeg"
import image5 from "../images/catalogue/hmgoepprod 4.jpeg"
import image6 from "../images/catalogue/hmgoepprod 5.jpeg"
import image7 from "../images/catalogue/hmgoepprod 6.jpeg"
import image8 from "../images/catalogue/hmgoepprod 7.jpeg"
import image9 from "../images/catalogue/hmgoepprod 8.jpeg"
import image10 from "../images/catalogue/hmgoepprod 9.jpeg"

const images = [
    { image: image1 },
    { image: image2 },
    { image: image3 },
    { image: image4 },
    { image: image5 },
    { image: image6 },
    { image: image7 },
    { image: image8 },
    { image: image9 },
    { image: image10 },
]

const Catalogue = () => {
    return (
        <>
            <section className="mt-12 flex flex-col">

                <hr />
                <div className="mt-10 ml-5 mb-4 flex flex-col lg:flex-row">
                    <div className="bg-black text-white pl-2 pr-2 w-auto justify-center font-convergence lg:mr-10" >
                        <p className="text-3xl lg:text-4xl xl:text-5xl ml-5 lg:ml-20 mr-5 lg:mr-20 mt-3 mb-3 text-center lg:text-left">Check out all the clothes</p>
                    </div>
                    <div className="flex justify-center text-lg lg:text-xl mt-4 lg:mt-0 font-convergence">
                        <p className="ml-5 mr-5 lg:ml-10 lg:mr-10 text-center lg:text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla, enim obcaecati tempora autem maiores distinctio rem laudantium amet doloribus voluptas odio eos sint modi.</p>
                    </div>
                </div>
                <hr />

                <div className="relative w-full overflow-hidden">
                    <div className="flex mt-8 space-x-4 animate-scroll px-4">
                        {images.map((item, index) => (
                            <div key={index} className="shrink-0">
                                <img src={item.image} alt={`Clothing ${index + 1}`} className="h-[15em] w-[10em] sm:h-[20em] sm:w-[14em] md:h-[25em] md:w-[16em] lg:h-[30em] lg:w-[20em] max-w-none rounded-lg" />
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </>
    )
}

export default Catalogue
