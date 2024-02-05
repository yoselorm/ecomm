import React from 'react';
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbMedal } from "react-icons/tb";

const Banner = () => {
    return (
        <div className='my-6 flex flex-col sm:flex-row gap-4'>
            <div className='p-4 m-4 sm:w-full  shadow-md'>
                <div className='flex gap-4 items-center'>
                <LiaShippingFastSolid size={28} className='text-gray-600'/>
                <p className='text-md font-semibold text-orange-600'>Delivery/Shipping available</p>
                </div>
                <p className='text-sm 2xl:text-lg text-gray-600 mt-2'>Experience swift, stress-free delivery to your door. Elevate your shopping with our seamless shipping options.</p> 
            </div>
            <div className='p-4 m-4 sm:w-full shadow-md'>
                <div className='flex gap-4 items-center'>
                <RiSecurePaymentLine size={28} className='text-gray-600'/>
                <p className='text-md font-semibold text-orange-600'>Secured Payments</p>
                </div>
                <p className='text-sm 2xl:text-lg text-gray-600 mt-2'>Shop confidently with our fortress-like secured payment system, ensuring your transactions are safeguarded at every step for a worry-free checkout experience.</p> 
            </div>
            <div className='p-4 m-4 sm:w-full  shadow-md'>
                <div className='flex gap-4 items-center'>
                <TbMedal size={28} className='text-gray-600'/>
                <p className='text-md font-semibold text-orange-600'>Best Products</p>
                </div>
                <p className='text-sm 2xl:text-lg text-gray-600 mt-2'>Unleash the extraordinary with our curated collection of best-in-class products—where quality meets distinction, and satisfaction knows no bounds.</p> 
            </div>
        </div>
    );
}

export default Banner;
