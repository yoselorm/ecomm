import React, { useState } from 'react';
import { CiHeart, CiLogout, CiMenuFries, CiSearch, CiShoppingCart, CiUser } from 'react-icons/ci';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { userInfo, user_auth } from '../Redux/AuthSlice';
import { toast } from 'react-toastify';
import { clearCart } from '../Redux/CartSlice';

const Navbar = () => {
    const [nav, setNav] = useState(false)
    const handleNav = () => {
        setNav(!nav)
    }
    const userDetails = useSelector((state) => state.auth)
    const cart = useSelector((state)=>state.cart.items)

    const admin = userDetails?.user[0]?.email
    console.log(admin);
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const logOut = (e) => {
        e.preventDefault();
        const auth = getAuth();

        signOut(auth)
            .then(() => {
                // Sign-out successful
                sessionStorage.clear()
                dispatch(clearCart())
                navigate('/login')
                toast.success('Signed Out')
                dispatch(user_auth())
                dispatch(userInfo({}))
            })


            .catch((error) => {
                // An error happened.
                console.error("Error during sign-out:", error.message);
                toast.error(error.message)
            })
    };

    return (
        <div>
            <div className='sm:mt-8 sm:p-2 mt-6 flex justify-around items-center '>
                <div className='flex sm:gap-6 gap-2 justify-center items-center'>
                    <Link to='/wishlist'>
                        <div className='hidden sm:block'>
                            <CiHeart size={38} className='hover:text-orange-600' />
                        </div>
                    </Link>

                    <div className='sm:hidden'>
                        <CiMenuFries onClick={handleNav} className='hover:text-orange-600 text-2xl sm:text-4xl' />
                    </div>
                    {/* <div>
                        <CiSearch className='hover:text-orange-600 text-2xl sm:text-4xl' />
                    </div> */}


                </div>
                <Link to='/'>
                    <div className='text-center cursor-pointer flex flex-col'>
                        <p className='text-2xl sm:text-5xl font-bold'>
                            <span className='text-gray-700'>MANNY</span>
                            <span className='text-orange-600'>STORE.</span>
                        </p>
                        {userDetails.authentication && <div >
                            <p className='hover:text-orange-600 text-sm' ><span className='text-orange-500'>Welcome</span>  , {userDetails?.user[0]?.displayName}</p>
                        </div>}
                    </div>

                </Link>

                <div className='flex sm:gap-6 gap-2 items-center'>
                    {!userDetails.authentication && <div>
                        <Link to='/login'>
                            <CiUser className='hover:text-orange-600 text-2xl sm:text-4xl' />
                        </Link>

                    </div>}
                    {/* <div>
                        <CiShoppingCart className='hover:text-orange-600 text-2xl sm:text-4xl' />
                    </div> */}
                    {userDetails.authentication && <div onClick={logOut} className='flex flex-col items-center cursor-pointer hover:text-orange-600'>
                        <CiLogout className='hover:text-orange-600 text-2xl sm:text-4xl' />
                        <p className='text-xs hover:text-orange-600 '>Logout</p>
                    </div>}

                </div>
            </div>

            <div className='hidden sm:flex justify-center mt-6'>
                <ul className='flex space-x-10 items-center'>
                    <Link to='/' >
                        <li  className='sm:text-xl text-lg p-2 border-b-[1px] font-light cursor-pointer hover:text-orange-600 hover:border-b hover:border-orange-600'>
                            Home
                        </li>
                    </Link>
                    <Link to='shop' >
                        <li onClick={handleNav} className='sm:text-xl text-lg p-2 border-b-[1px]  font-light cursor-pointer hover:text-orange-600 hover:border-b hover:border-orange-600'>
                            Shop
                        </li>
                    </Link>

                    <li   className='sm:text-xl text-lg p-2 border-b-[1px]  font-light cursor-pointer hover:text-orange-600 hover:border-b hover:border-orange-600'>
                        About
                    </li>

                    {admin == 'admin@mannystore.com' ? <Link to='/dashboard' >
                        <li className='sm:text-xl text-lg p-2 border-b-[1px]  font-light cursor-pointer hover:text-orange-600 hover:border-b hover:border-orange-600'>
                            Dashboard
                        </li>
                    </Link> : <li className='sm:text-xl text-lg p-2 border-b-[1px]  font-light cursor-pointer hover:text-orange-600 hover:border-b hover:border-orange-600'>
                        Contact
                    </li>}

                </ul>
            </div>

            {/* mobile */}
            <div className={nav ? 'sm:hidden ease-in duration-300 fixed w-[90%] bg-orange-50 h-full z-10 left-0 top-0' : 'fixed w-[90%] sm:hidden ease-in duration-300  bg-orange-100 h-full z-10 left-[-100%] top-0'}>
                <div className='flex justify-end p-2'>
                    <AiOutlineClose size={22} onClick={handleNav} />
                </div>
                <div>
                    <ul className='flex flex-col justify-center gap-4 items-center'>
                        <Link to='/' onClick={handleNav} >
                            <li className='sm:text-xl text-lg p-2 border-b-[1px] font-light border-orange-600'>
                                Home
                            </li>
                        </Link>
                        <Link to='/wishlist' onClick={handleNav} >
                            <li className='sm:text-xl text-lg p-2 border-b-[1px] font-light border-orange-600'>
                                Wishlist
                            </li>
                        </Link>

                        <Link to='/shop' onClick={handleNav} >
                            <li className='sm:text-xl text-lg p-2 border-b-[1px]  font-light border-orange-600'>
                                Shop
                            </li>
                        </Link>
                        <li className='sm:text-xl text-lg p-2 border-b-[1px]  font-light border-orange-600'>
                            About
                        </li>
                    {admin == 'admin@mannystore.com' ? <Link to='/dashboard' onClick={handleNav} >
                        <li className='sm:text-xl text-lg p-2 border-b-[1px]  font-light border-orange-600'>
                            Dashboard
                        </li>
                    </Link>:
                    <li onClick={handleNav}  className='sm:text-xl text-lg p-2 border-b-[1px]  font-light border-orange-600'>
                        Contact
                    </li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
