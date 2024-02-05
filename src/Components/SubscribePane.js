import React from 'react';

const SubscribePane = () => {
    return (
        <div className='w-[95%] bg-gradient-to-r mx-auto from-[#3C2A21] to-[#6b240cf0] my-16 sm:h-[300px] h-[350px]  flex justify-center items-center '>
            <div className='px-6'>
                <p className='text-white text-2xl md:text-3xl font-semibold text-center'>Let's Keep in Touch</p>
                <p className='text-white text-xl mt-2 tracking-normal text-center'>Join our list and get updates on all new products and promo's ahead</p>
                <div className='flex flex-col sm:flex-row gap-4 items-center'>
                    <input className='border-[1px] border-white focus:outline-none bg-transparent w-full text-white mt-6 h-10 rounded-sm p-2' placeholder='ENTER YOUR EMAIL' />
                    <button className='text-white bg-orange-500 rounded-md w-36 h-14 mt-4 sm:mt-6 tracking-widest hover:opacity-90'>SUSCRIBE</button>
                </div>

            </div>
        </div>
    );
}

export default SubscribePane;
