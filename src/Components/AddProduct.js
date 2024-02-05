import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from '../Firebase';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const AddProduct = ({ showProductModal }) => {
    const [productName, setProductName] = useState('')
    const [price, setPrice] = useState(0)
    const [size,setSize]=useState("")
    const [file, setFile] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0);



    const addProduct = async (e) => {
        e.preventDefault();
        toast.warn('adding....')
        const storage = getStorage();
        const metadata = {
            contentType: 'image/jpeg', // You might want to dynamically determine this based on the file type
        };

        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress)
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                switch (error.code) {
                    case 'storage/unauthorized':
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        // Unknown error occurred, inspect error.serverResponse
                        break;
                }
                toast.error(error.message)
            },
            async () => {
                // Upload completed successfully, now we can get the download URL
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

                const productId = uuidv4();
                const productRef = doc(db, 'shop_products', productId);
          
                await setDoc(productRef, {
                  id: productId,
                  productName,
                  price,
                  sizes: size.split(',').map(Number),
                  image: downloadURL,
                });
          

                // Close the modal after successful upload and Firestore operation
                showProductModal();
                toast.success('Product added')
                setProductName('')
                setPrice('')
                setSize('')
                setFile(null)
            }
        );
    };





    return (
        <div className='bg-white p-4 mx-6 md:mx-0 my-4 '>
            <div className='flex justify-end'>
                <IoCloseOutline onClick={showProductModal} className='font-bold hover:scale-125 ease-in duration-150 hover:text-orange-500' />
            </div>
            <div className=' bg-white p-4 flex justify-center items-center'>

                <form className="space-y-4">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Product Name</label>
                        <input
                            value={productName}
                            onChange={(e) => { setProductName(e.target.value) }}
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none  block w-full p-2.5 "
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
                        <div className='flex justify-between items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 '>
                            <input
                                value={price}
                                onChange={(e) => { setPrice(e.target.value) }}
                                type='number'
                                placeholder=""
                                className="bg-gray-50 focus:outline-none w-full"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Sizes</label>
                        <div className='flex justify-between items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 '>
                            <input
                                value={size}
                                onChange={(e) => { setSize(e.target.value) }}
                                type='text'
                                placeholder=""
                                className="bg-gray-50 focus:outline-none w-full"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 ">Product image</label>
                        <div className='flex justify-between items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 '>
                            <input
                                type='file'
                                placeholder=""
                                className="bg-gray-50 focus:outline-none w-full"
                                required
                                onChange={(e) => { setFile(e.target.files[0]); setUploadProgress(0); }}


                            />
                        </div>
                    </div>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className='mt-4'>
                            <progress className='w-full bg-blue-500' value={uploadProgress} max='100'></progress>
                            <p className='text-sm mt-2 text-blue-500'>{`Upload Progress: ${uploadProgress.toFixed(2)}%`}</p>
                        </div>
                    )}
                    <button
                        onClick={addProduct}
                        className="w-full mt-8 text-white bg-neutral-600 hover:bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Add
                    </button>
                </form>
            </div>

        </div>
    );
}

export default AddProduct;
