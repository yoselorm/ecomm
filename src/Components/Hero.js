import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import sandal_one from '../asssets/sandal4.jpg';
import sandal_three from '../asssets/slider2.jpg';
import sandal_four from '../asssets/slider3.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

const Hero = () => {
    const slides = [sandal_one, sandal_three, sandal_four];
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // Automatic slide
    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 4000);

        return () => clearInterval(interval);
    }, [currentIndex]);

    return (
        <div className="sm:h-[700px] h-[80vh] w-full mx-auto py-10 px-4 relative group">
            <div
                style={{ backgroundImage: `url(${slides[currentIndex]})` }}
                className="w-full sm:h-full h-[70vh] bg-center bg-cover duration-500 relative"
            >
                <div className='h-full w-full bg-black/40'>
                <div className="absolute hidden group-hover:block top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactLeft size={30} onClick={prevSlide} />
                </div>
                <div className="absolute hidden group-hover:block top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
                    <BsChevronCompactRight size={30} onClick={nextSlide} />
                </div>
                <div className="absolute top-[10%] sm:top-[35%] sm:left-10 left-0 ">
                    <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-white p-8">
                        Slip into Serenity: Embrace Comfort,
                        <br /> Unleash Style with
                        <span className="text-orange-600"> MannyStore</span>, <br /> Your
                        Gateway to Elegant Feet.
                    </p>
                </div>
                <div className="absolute lg:top-[70%] top-[70%] sm:top-[90%] left-20 ">
                    <button className="p-4 bg-orange-600 text-white hover:opacity-90 shadow-lg">
                        SHOP NOW
                    </button>
                </div>
                </div>
               
            </div>
        </div>
    );
};

export default Hero;
