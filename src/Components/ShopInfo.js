import React, { useState } from 'react';
import sandal2 from '../asssets/sandal2.jpeg';
import { FaCartArrowDown } from "react-icons/fa";
import { IoHeart } from "react-icons/io5";
import { CiShoppingCart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addDoc, collection, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { addItem } from '../Redux/CartSlice';
import { db } from '../Firebase';
import { toast } from 'react-toastify';
const ShopInfo = ({ products }) => {

  const userDetails = useSelector((state) => state.auth)

  const [searchText, setSearchText] = useState('');
  const [selectedSize, setSelectedSize] = useState({});




  const dispatch = useDispatch()


  const wishProduct = async (e, product) => {
    e.preventDefault();
    toast('Adding to wishlist...please wait')
    if (!product.id) {
      console.error('Error: Product ID is not defined.');
      return;
    }

    try {
      const wishlistRef = collection(db, 'wishlist');
      const userDocRef = doc(wishlistRef, userDetails.user?.[0].uid);

      // Get the user's wishlist document
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // Document exists, update the wishlist array
        const currentWishlist = userDocSnapshot.data().wishlist || [];
        const updatedWishlist = [...currentWishlist, product];

        // Update the wishlist document
        await updateDoc(userDocRef, { wishlist: updatedWishlist });

        // console.log('Product added to wishlist:', product);
        // Provide feedback to the user
        toast.success('Product added to wishlist!');
      } else {
        // Document doesn't exist, create a new one
        const newWishlist = [product];

        // Create the wishlist document
        await setDoc(userDocRef, { id: userDetails.user?.[0].uid, wishlist: newWishlist });

        // console.log('Wishlist document created with product:', product);
        // Provide feedback to the user
        toast.success('Product added to wishlist!');
      }
    } catch (error) {
      console.error('Error updating wishlist:', error.message);
      // Provide error feedback to the user
      toast.error('Error updating wishlist. Please login.');
    }
  };

  //delete product from wishlist
  const removeProductFromWishlist = async (productId) => {
    try {
      const wishlistRef = collection(db, 'wishlist');
      const userDocRef = doc(wishlistRef, userDetails.user?.[0].uid);
  
      // Get the user's wishlist document
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        // Document exists, update the wishlist array
        const currentWishlist = userDocSnapshot.data().wishlist || [];
        const updatedWishlist = currentWishlist.filter((product) => product.id !== productId);
  
        // Update the wishlist document
        await updateDoc(userDocRef, { wishlist: updatedWishlist });
  
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
  
  

  

  const addToCart = (item) => {
    const selectedSizeForItem = selectedSize[item.id];

    if (!selectedSizeForItem) {
      // Provide feedback to the user if no size is selected
      toast.warning('Please select a size before adding to cart');
      return;
    }
    const itemDetails = {
      id: item.id,
      name: item.productName,
      image: item.image,
      price: parseFloat(item.price),
      quantity: 1,
      size: selectedSize[item.id],
    };
    dispatch(addItem(itemDetails));
    toast.success('added to cart')
    console.log(cart);

  };

  const cart = useSelector((state) => state.cart.items)
  console.log(products);





  return (
    <div className='mb-16'>
      <div className='flex justify-between p-6'>
        <div>
          <input
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value) }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none  block w-full p-2.5 "
            placeholder="Search product"

          />
        </div>
        <Link to='/cart'>
          <div className='flex flex-col items-center hover:text-orange-600 '>
            <CiShoppingCart className='relative text-2xl sm:text-4xl ' />
            <p className='absolute right-3 text-xs text-white z-10 bg-orange-600 p-1 rounded-md shadow-lg '>{cart.length}</p>
            <p className='text-[10px]'>Cart</p>
          </div>
        </Link>


      </div>

      <div className='mx-14 grid sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {products.filter((value) => {
          if (searchText === '') {
            return value
          } else if (
            value.productName &&  // Add a check to ensure value.name is defined
            value.productName.toLowerCase().includes(searchText.toLowerCase())
          ) {
            return value;
          }
        }).map((item) => (
          <div key={item.id} className='relative group shadow-md'>
            <img src={item.image} className='w-full h-60 object-cover' />
            <div className='bg-black/50 absolute flex justify-center items-center gap-4 w-full h-60 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <FaCartArrowDown onClick={() => addToCart(item)} size={32} className='text-white hover:text-orange-400' />
              <IoHeart onClick={(e) => wishProduct(e, item)} size={32} className='text-white hover:text-orange-400' />
            </div>
            <div className='flex w-full justify-between items-center px-1 h-18 '>
              <div className='flex flex-col gap-1'>
                <p className='font-semibold font-serif tracking-wider'>{item.productName}</p>
                <div className='flex items-center gap-2 py-2'>
                  {item?.sizes.map((size) => (
                    <button
                      key={size}
                      className={`text-white bg-orange-500 px-2 text-xs shadow-md ${
                        selectedSize[item.id] === size ? 'bg-orange-800' : 'hover:bg-orange-400'
                      }`}
                      onClick={() => {
                        const updatedSizes = { ...selectedSize, [item.id]: size };
                        setSelectedSize(updatedSizes);
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <p className='font-bold text-orange-500 font-serif tracking-wider'>GHc {item.price}</p>
              <p className='font-bold text-orange-500 font-serif tracking-wider flex items-center gap-2'> </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopInfo;
