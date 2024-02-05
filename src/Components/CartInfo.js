import React, { useState } from 'react';
import sandal from './../asssets/sandal2.jpeg'
import { removeItem,updateQuantity } from '../Redux/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { IoTrashBinOutline } from "react-icons/io5";


const CartInfo = ({items}) => {
    
    const [quantity, setQuantity] = useState(items.quantity)
    const dispatch =useDispatch()
    const increase = (e) => {
        e.preventDefault()
        setQuantity((prevQuantity) => prevQuantity + 1)
        dispatch(updateQuantity({ id: items.id, quantity: quantity + 1 }));

    }
    const decrease = (e) => {
        e.preventDefault();
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
            dispatch(updateQuantity({ id: items.id, quantity: quantity - 1 }));
        }
    }
    const cartItems = useSelector((state) => state.cart.items);
    const total = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.quantity;
      }, 0);
    
    console.log(total);
    
    
    
    
    return (
        <div className='flex justify-center items-center my-8  p-3 shadow-sm'>
            
            <div className='flex flex-col item-center gap-4 sm:flex-row'>
                <div className='flex items-center gap-4'>
                    <img src={items.image} className='w-20 h-20 object-cover rounded-sm shadow-md' />
                    <div className='flex-col items-center gap-4'>
                        <p className='font-semibold text-orange-600 font-serif tracking-wider'>{items.name}</p>
                        <p className='text-xs font-bold'>Size: {items.size}</p>
                    </div>
                </div>

                <div className='flex items-center gap-4'>
                    <div className='flex items-center gap-4'>
                        <button onClick={decrease} disabled={quantity === 1} className='rounded-full bg-orange-500 w-8 h-8 hover:bg-orange-300 text-white font-bold text-xl'>-</button>
                        <p  className='bg-neutral-200 font-bold text-xs p-2'>{quantity}</p>
                        <button onClick={increase} className='bg-orange-500 rounded-full w-8 h-8 hover:bg-orange-300 text-white font-bold text-xl'>+</button>
                    </div>

                    <div className='flex items-center gap-4'>
                        <p className='text-sm'>Price : <span className='font-serif text-xs'>GHc </span><span className='font-semibold font-mono'>{items.price * quantity}</span></p>
                        <button onClick={() => dispatch(removeItem({ id: items.id,size: items.size }))}  className='text-xs text-red-500 hover:text-red-600 font-semibold'><IoTrashBinOutline size={18}/></button>
                    </div>
                </div>

            </div>
            
        </div>
    );
}

export default CartInfo;
