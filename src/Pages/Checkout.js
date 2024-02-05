import React, { useState } from 'react';
import BillingForm from '../Components/BillingForm';
import sandal2 from '../asssets/sandal2.jpeg';
import CartSummary from '../Components/CartSummary';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PaystackPop from '@paystack/inline-js';


const Checkout = () => {
    const productType = ['accra', 'kumasi']
    const order = useSelector((state) => state.order.orders)
    const cartItems = useSelector((state) => state.cart.items);
    const subtotal = cartItems.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.price * currentItem.quantity;
      }, 0);
      const shipping = 30;
    console.log(order);
      
    const[firstname,setFirstname]= useState('');
    const [lastname,setLastname]= useState('');
    const [country,setCountry]= useState('')
    const [city,setCity]= useState('')
    const [address,setAddress]= useState('')
    const [email,setEmail]= useState('')
    const [phone,setPhone]= useState('')
    const [notes,setNotes]= useState('')
    const amount =subtotal + shipping;

    // const handlePayment =(e)=>{
    //     e.preventDefault();
    //     const paystack = new PaystackPop()
    //     paystack.newTransaction({
    //         key:"pk_test_00e2fe640725f18336ea6479dfe2721d13354520",
    //         amount: amount*100,
    //         email:'johndoe@gmal.com',
    //         onSuccess(transaction){
    //             let  message= `Payment succesful ${transaction.reference}`
    //             alert(message)
    //         },
    //         onCancel(){
    //      alert('Payment canceled')
    //         },

    //     })
        
    // }


    return (
        <div className='grid md:grid-cols-2 gap-12 md:gap-48 w-full h-full p-8'>
            <div>
                <h5 className='text-sm md:text-lg font-bold'>Billing Details</h5>
                <form className='my-4'>
                    <div className="grid gap-2 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">first name</label>
                            <input
                                value={firstname}
                                onChange={(e)=>{setFirstname(e.target.value)}}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="John"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">last name</label>
                            <input
                                value={lastname}
                                onChange={(e)=>{setLastname(e.target.value)}}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Country</label>
                            <input
                                value={country}
                                onChange={(e)=>{setCountry(e.target.value)}}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="e.g. Ghana"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Town/City</label>
                            <input
                                value={city}
                                onChange={(e)=>{setCity(e.target.value)}}
                                type="text"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                                placeholder="e.g Accra"
                                required
                            />
                        </div>


                        {/* <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 ">Town/City</label>
                            <select
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="" disabled hidden>
                                    Select an option
                                </option>
                                {productType.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div> */}

                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Home address</label>
                        <input
                            value={address}
                            onChange={(e)=>{setAddress(e.target.value)}}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="123 ABC street,N/A"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
                        <input
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            type="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="john.doe@company.com"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                        <input
                            value={phone}
                            onChange={(e)=>{setPhone(e.target.value)}}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="+233 554785444"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className=" mb-2 text-sm font-medium text-gray-900 flex">Order notes <span><p className='font-normal'>(optional)</p></span></label>
                        <textarea
                            value={notes}
                            onChange={(e)=>{setNotes(e.target.value)}}
                            rows={4}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Any special notes about order"

                        />
                    </div>

                    {/* <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input

                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                            required
                        />
                    </div>
                    <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 ">
                        I agree with the <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.
                    </label>
                </div> */}
                    <div className='flex items-center gap-4'>
                        {/* <button
                        type="submit"
                        className={`text-white bg-gradient-to-r from-blue-400 to-blue-700 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center `}
                    >
                        Submit 
                    </button>*/}
                        <Link to='/cart'>
                            <button
                                type="button"
                                className="text-white bg-gradient-to-r from-neutral-400 to-neutral-700 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                            >
                                Back
                            </button>
                        </Link>

                    </div>

                </form>
            </div>
            <div className='flex flex-col h-[50vh]'>
                <div className='flex-1'>
                    <h5 className='text-sm md:text-lg font-bold'>Your Order</h5>
                    {order.map((item) => {
                        return (
                            <div className='flex items-center gap-4 my-4 font-mono'>
                                <img src={item.image} className='h-16 w-16 shadow-lg object-cover' />
                                <div>
                                    <p className='text-sm font-serif font-bold tracking-wider'>{item.name}</p>
                                    <p className='text-xs'>Size: {item.size}</p>
                                    <p className='text-xs'>{item.quantity} || {item.quantity * item.price}</p>
                                </div>
                            </div>
                        )
                    })}


                </div>
                <div>
                    <div className=' bg-neutral-100 z-10 p-4 flex mx-auto items-center justify-center'>
                        <div>
                            <p className='md:text-sm text-xs'>Subtotal: <span className='font-serif'>{subtotal}</span></p>
                            <p className='md:text-sm text-xs'>Shipping/Delivery fee: <span className='font-serif'>{shipping}</span></p>
                            <p className='md:text-sm text-xs font-bold'>TOTAL: <span className='font-serif'>GHc {subtotal + shipping}</span></p>
                            <button className="md:w-[300px] w-[200px] mt-4 flex mx-auto items-center justify-center text-white bg-blue-600 hover:bg-blue-700  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Continue to Payment</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Checkout;
