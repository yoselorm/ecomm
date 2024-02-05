import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { RiInstagramFill } from "react-icons/ri";
import { FaTiktok } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <div className='w-full bg-gradient-to-r mx-auto from-[#3C2A21] via-[#6b240cf0] to-[#3C2A21]  sm:h-[300px] h-[450px]  flex flex-col sm:flex-row justify-center gap-10 sm:gap-12 lg:gap-48 2xl:w-[95%] items-center '>
                    <div>
                        <p className='text-xl font-bold text-white mb-3  text-center sm:text-left'>Contact</p>
                        <ul className='flex flex-col gap-2 text-center sm:text-left'>
                            <li className='text-white text-lg'>workforwork@gmail.com</li>
                            <li className='text-white text-lg'>+233 55 475 444</li>
                            <li className='text-white text-lg'>MannyStore</li>
                        </ul>
                    </div>

                    <div className='flex flex-col items-center justify-center gap-4'>
                        <p className='text-2xl sm:text-3xl lg:text-5xl font-bold cursor-pointer'>
                            <span className='text-white'>MANNY</span>
                            <span className='text-orange-600'>STORE.</span>
                        </p>
                        <ul className='flex sm:gap-4 items-center justify-center'>
                            <li className='cursor-pointer'><FaFacebook size={28} className='text-white hover:text-orange-500'/></li>
                            <li className='cursor-pointer'><AiFillTwitterCircle size={30} className='text-white hover:text-orange-500 '/></li>
                            <li className='cursor-pointer'><RiInstagramFill size={28} className='text-white hover:text-orange-500'/></li>
                            <li className='cursor-pointer'><FaTiktok size={28} className='text-white hover:text-orange-500'/></li>
                        </ul>
                    </div>

                    <div>
                        <p className='text-xl font-bold text-white mb-3 text-center sm:text-left'>Quick Access</p>
                        <ul className='flex flex-col gap-2 text-center sm:text-left'>
                            <li className='text-white text-lg hover:text-orange-500 cursor-pointer'>Shop</li>
                            <li className='text-white text-lg hover:text-orange-500 cursor-pointer'>Contact US</li>
                            <li className='text-white text-lg hover:text-orange-500 cursor-pointer'>Terms & Conditions</li>
                        </ul>
                    </div>
                </div>
                <div className='h-16 w-full bg-orange-50 flex justify-center items-center'>
                    <p className='text-center'>All rights reserved &copy; 2023 . Made by Dev_Lormy💻</p>
                </div>
            </div>
        
    );
}

export default Footer;
