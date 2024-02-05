import React from 'react';
import banner1 from '../asssets/banner1.jpg'
import banner2 from '../asssets/banner2.jpg'
import sandal3 from '../asssets/sandal3.jpeg'
import sandal1 from '../asssets/sandal1.jpeg'
import sandal5 from '../asssets/sandal5.jpeg'
import { FaAngleRight } from "react-icons/fa";

const BannerExtra = () => {
    return (
        <div className=''>
            <div className='flex flex-col md:flex-row gap-4 p-4 sm:h-[350px] my-4'>
                <div className='w-full sm:h-[300px] flex flex-col justify-center items-center h-[50vh] bg-orange-50 p-4'>
                    <p className='text-3xl text-center text-[#6B240C] font-bold sm:text-3xl xl:text-4xl'>Trending <span className='text-orange-500'>Manny </span>Collections</p>
                    <p className='text-center text-gray-700 text-md mt-4 w-1/2 '>Checkout some of our solid collections this season.</p>
                </div>
                <div style={{ backgroundImage: `url(${banner1})` }} className="shadow-lg w-full sm:h-[300px] h-[350px] bg-center bg-cover relative">
                    <div className='m-8 bg-orange-400 p-4 w-1/2'>
                        <p className='text-[#6B240C] font-bold text-xl'>Passion Pearl Collections</p>
                        <div className='flex gap-2 items-center mt-2'>
                            <FaAngleRight className='p-1 cursor-pointer hover:bg-orange-100 bg-white text-orange-600 text-3xl rounded-full' />
                            <p className='text-white'>Get it Now</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className='h-[900px] sm:h-[500px] p-2 flex flex-col sm:flex-row gap-4 my-4'>
                <div className='h-[450px] flex flex-col gap-4 sm:w-1/2'>
                    <div style={{ backgroundImage: `url(${sandal3})` }} className="shadow-lg w-full sm:h-[300px] h-[450px] bg-center bg-cover relative">
                        <div className='bg-[#9ADE7B]/70 h-full w-full p-4 flex flex-col items-center justify-center'>
                            <p className='text-2xl font-bold text-center text-neutral-700 '>Walk your way through: <span>Ladies love ❤️</span></p>
                            <div className='flex gap-2 items-center mt-2'>
                                <FaAngleRight className='p-1 cursor-pointer hover:bg-orange-100 bg-white text-orange-600 text-3xl rounded-full' />
                                <p className='text-white'>Get it Now</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundImage: `url(${sandal1})` }} className="shadow-lg w-full sm:h-[300px] h-[450px] bg-center bg-cover relative">
                        <div className='bg-[#F875AA]/70 h-full w-full flex flex-col items-center justify-center'>
                            <p className='text-2xl font-bold text-center text-neutral-700 '>Sandal game strong: Embrace the trend effortlessly."</p>
                            <div className='flex gap-2 items-center mt-2'>
                                <FaAngleRight className='p-1 cursor-pointer hover:bg-orange-100 bg-white text-orange-600 text-3xl rounded-full' />
                                <p className='text-white'>Get it Now</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundImage: `url(${sandal5})` }} className="sm:w-1/2 shadow-lg sm:h-[450px] h-[450px] bg-center bg-cover " >
                    <div className='bg-[#BBAB8C]/70 h-full w-full flex flex-col items-center justify-center'>
                        <p className='text-2xl font-bold text-center text-neutral-700 '>Strut in style with our trending sandals—your chic companion for every step."</p>
                        <div className='flex gap-2 items-center mt-2'>
                            <FaAngleRight className='p-1 cursor-pointer hover:bg-orange-100 bg-white text-orange-600 text-3xl rounded-full' />
                            <p className='text-white'>Get it Now</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BannerExtra;
