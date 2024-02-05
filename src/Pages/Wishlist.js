import React, { useEffect, useState } from 'react';
import WishlistInfo from '../Components/WishlistInfo';
import { db } from '../Firebase';
import { collection, query, where, onSnapshot, getFirestore, doc, getDoc } from "firebase/firestore";
import { useSelector } from 'react-redux';

const Wishlist = () => {
    const wishlistFetch = useSelector ((state)=>state.wishlist)
    const wishlistInfo = wishlistFetch.wishlist
    const userDetails = useSelector ((state)=>state.auth)
   
    

    return (
        <div>
            <p className='w-full text-center text-xl font-bold my-4 text-stone-600'>Wishlist</p>
            <WishlistInfo wishlistInfo={wishlistInfo}/>
        </div>
    );
}

export default Wishlist;
