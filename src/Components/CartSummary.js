import React from 'react';
import { useSelector } from 'react-redux';
import sandal2 from '../asssets/sandal2.jpeg';

const CartSummary = () => {
    const cart = useSelector((state) => state.cart.items)
    console.log(cart);

    return (
        <div className='flex flex-col h-[50vh]'>
            <div className='flex-1'>
                <h5 className='text-sm md:text-lg font-bold'>Your Order</h5>
                <div className='flex items-center gap-4 my-4 font-mono'>
                    <img src={sandal2} className='h-16 w-16 shadow-lg' />
                    <div>
                        <p className='text-sm font-serif font-bold tracking-wider'>Dior SLides</p>
                        <p className='text-xs'>Size: 32</p>
                        <p className='text-xs'>GHc 234</p>
                    </div>
                </div>
                <div className='flex items-center gap-4 my-4 font-mono'>
                    <img src={sandal2} className='h-16 w-16' />
                    <div>
                        <p className='text-sm font-serif font-bold tracking-wider'>Dior SLides</p>
                        <p className='text-xs'>Size: 32</p>
                        <p className='text-xs'>GHc 234</p>
                    </div>
                </div>



            </div>
            <div>
                <div className=' bg-neutral-100 z-10 p-4 flex mx-auto items-center justify-center'>
                    <div>
                        <p className='md:text-sm text-xs'>Shipping fee:</p>
                        <p className='md:text-sm text-xs'>TOTAL:</p>
                        <button className="md:w-[300px] w-[200px] mt-4 flex mx-auto items-center justify-center text-white bg-blue-600 hover:bg-blue-700  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Continue to Payment</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CartSummary;
