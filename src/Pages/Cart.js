import React from 'react';
import CartInfo from '../Components/CartInfo';
import { useDispatch, useSelector } from 'react-redux';
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import { addOrder } from '../Redux/OrderSlice';

const Cart = () => {
    const cart = useSelector((state) => state.cart.items)
    console.log(cart);
    const cartItems = useSelector((state) => state.cart.items);
    const total = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.quantity;
      }, 0);
      const navigate =useNavigate()
      const dispatch = useDispatch()
      const toCheckout =(e)=>{
        e.preventDefault();
        dispatch(addOrder(cartItems))
        navigate('/checkout')
      }

    
    return (
        <div className='flex flex-col h-screen"'>
            <div className='flex-1 overflow-y-auto'>
            <Link to='/shop'>
                <div className='px-4 m-4 flex items-center gap-2 cursor-pointer'>
                    <IoArrowBack size={34} className='hover:text-orange-600 hover:scale-125 duration-150 ease-in-out cursor-pointer bg-orange-100 rounded-full p-2' />
                    <p className='text-xs text-neutral-900 font-semibold'>Back</p>
                </div>
            </Link>

            {cart.map((items,index) => {
                return (
                    <div key={index}>
                        <CartInfo items={items} />
                    </div>
                )
            })}
            </div>
          

            <div className='sticky bottom-0 bg-neutral-100 z-10 p-4 flex mx-auto items-center justify-center'>
                <div>
                    <p className='md:text-md text-sm font-semibold text-center'>SUBTOTAL: GHc {total} </p>
                    <button onClick={toCheckout} className="md:w-[300px] w-[200px] mt-4 flex mx-auto items-center justify-center text-white bg-blue-600 hover:bg-blue-700  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs px-5 py-2.5 text-center">CHECKOUT</button>
                </div>
            </div>

        </div>
    );
}

export default Cart;
