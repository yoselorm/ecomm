import React, { useState } from 'react';
import { FaRegEyeSlash } from 'react-icons/fa';
import { IoEyeOutline } from 'react-icons/io5';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { IoArrowBack } from "react-icons/io5";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc,doc } from 'firebase/firestore';
import { db } from '../Firebase';
import { userInfo,user_auth } from '../Redux/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';


const SignUpForm = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordState, setPasswordState] = useState(false);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handlePasswordToggle = (e) => {
        e.preventDefault();
        setPasswordState(!passwordState);
    };
const userdetails = useSelector((state)=>state.auth)

const signup = async (e) => {
    e.preventDefault();
    toast('Loading...')
    const auth = getAuth();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Signed up
        const user = userCredential.user;
        await updateProfile(user, {
            displayName: username,
        });

        // Store user information in Firestore
        const userRef = doc(db, "users", user.email);
        await setDoc(userRef, {
            displayName: username,
            email: user.email,
            // Add other user information as needed
        });

        // console.log("User signed up successfully:", user);

        // Dispatch only the necessary properties to Redux
        // const userInfoPayload = {
        //     uid: user.uid,
        //     displayName: user.displayName,
        //     email: user.email,
        //     // Add other necessary properties
        // };

        // dispatch(user_auth());
        // dispatch(userInfo(userInfoPayload));

        navigate('/shop');
        toast.success('sign up successful')
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.error("Error signing up:", errorCode, errorMessage);
        // Provide feedback to the user, e.g., display an error message
        toast.error(error.message)
    }
};

    console.log(userdetails)

    return (
        <div>
            <div className='flex items-center justify-center h-screen'>
                <div className="w-full flex flex-col justify-center bg-white rounded-lg shadow sm:max-w-md">
                <p className='text-sm sm:text-sm font-bold text-center'>
                        <span className='text-gray-700'>MANNY</span>
                        <span className='text-orange-600'>STORE.</span>
                    </p>
                    <div className="p-6 space-y-4">
                        <div className='flex justify-between'>
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign Up
                            </h1>
                            <Link to='/login'>
                                <IoArrowBack size={22} className='hover:text-orange-500 hover:scale-150 ease-in duration-150' />
                            </Link>
                        </div>

                        <form className="space-y-4" action="#">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                <input
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none  block w-full p-2.5 "
                                    placeholder=""
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                                <input
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none  block w-full p-2.5 "
                                    placeholder="store@provider.com"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <div className='flex justify-between items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 '>
                                    <input
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value) }}
                                        type={passwordState ? "text" : "password"}
                                        name="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 focus:outline-none w-full"
                                        required
                                    />
                                    {passwordState ? <IoEyeOutline size={20} onClick={handlePasswordToggle} className='cursor-pointer' /> : <FaRegEyeSlash size={20} onClick={handlePasswordToggle} className='cursor-pointer' />}
                                </div>
                            </div>
                            <button
                                onClick={signup}
                                className="w-full mt-8 text-white bg-neutral-600 hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Sign Up
                            </button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
