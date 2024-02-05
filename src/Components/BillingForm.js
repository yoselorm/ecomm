import React from 'react';
import { Link } from 'react-router-dom';

const BillingForm = () => {
    const productType = ['accra','kumasi']
    return (
        <div>
            <h5 className='text-sm md:text-lg font-bold'>Billing Details</h5>
            <form className='my-4'>
                <div className="grid gap-2 mb-6 md:grid-cols-2">
                <div>
                        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 ">first name</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="John"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">last name</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Doe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Country</label>
                        <input
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="Doe"
                            required
                        />
                    </div>

                
                    <div>
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
                    </div>
                  
                </div>
                <div className="mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Home address</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="123 ABC street,N/A"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Email address</label>
                    <input
                        type="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="john.doe@company.com"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">Phone number</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="+233 554785444"
                        required
                    />
                </div>
                <div className="mb-2">
                    <label className=" mb-2 text-sm font-medium text-gray-900 flex">Order notes <span><p className='font-normal'>(optional)</p></span></label>
                    <textarea
                    rows={4}
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                        placeholder="Any special notes about order"
                        
                    />
                </div>
               
                <div className="flex items-start mb-6">
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
                </div>
                <div className='flex items-center gap-4'>
                    <button
                        type="submit"
                        className={`text-white bg-gradient-to-r from-blue-400 to-blue-700 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center `}
                    >
                        Submit
                    </button>
                    <Link to='/cart'>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-neutral-400 to-neutral-700 hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
                        >
                            Cancel
                        </button>
                        </Link>

                </div>

            </form>
        </div>
    );
}

export default BillingForm;
