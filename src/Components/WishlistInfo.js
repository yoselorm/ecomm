import React from 'react';
import { FaCartArrowDown } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { CiShoppingCart } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../Firebase';
import { IoTrashBinOutline } from "react-icons/io5";
import { addWishlist } from '../Redux/WishlistSlice';




const WishlistInfo = ({wishlistInfo}) => {
    const userDetails = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    const removeProductFromWishlist = async (productId) => {
        try {
          console.log('Removing product with ID:', productId);
      
          const wishlistRef = collection(db, 'wishlist');
          const userDocRef = doc(wishlistRef, userDetails.user?.[0].uid);
      
          // Get the user's wishlist document
          const userDocSnapshot = await getDoc(userDocRef);
      
          if (userDocSnapshot.exists()) {
            // Document exists, update the wishlist array
            const currentWishlist = userDocSnapshot.data().wishlist || [];
            const updatedWishlist = currentWishlist.filter((product) => product.id !== productId);
      
            console.log('Current wishlist:', currentWishlist);
            console.log('Updated wishlist:', updatedWishlist);
      
            // Update the wishlist document
            await updateDoc(userDocRef, { wishlist: updatedWishlist });
            dispatch(addWishlist(updatedWishlist))
            // Provide feedback to the user
            toast.success('Product removed from wishlist!');
          } else {
            // Wishlist document doesn't exist
            console.error('Error: Wishlist document not found.');
            toast.error('Error removing product from wishlist.');
          }
        } catch (error) {
          console.error('Error removing product from wishlist:', error.message);
          // Provide error feedback to the user
          toast.error('Error removing product from wishlist.');
        }
      };
      
      
      

    return (
        <div className='mx-14 mt-5 grid sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {wishlistInfo?.map((item,index) => (
            <div key={index} className='relative group shadow-md'>
                <img src={item.image} className='w-full h-60 object-cover' />
                <div className='bg-black/50 absolute flex justify-center items-center gap-4 w-full h-60 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <IoTrashBinOutline onClick={() => removeProductFromWishlist(item.id)} size={32} className='text-white hover:text-orange-400' />
                    
                </div>
                <div className='flex w-full justify-between items-center px-1 h-16 '>
                    <p className='font-semibold'>{item.productName}</p>
                    <p className='font-bold text-orange-500'>{item.price}</p>
                </div>
            </div>
        ))}
      
    </div>
    );
}

export default WishlistInfo;
