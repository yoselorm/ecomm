import { doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { IoCloseOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import { db } from '../Firebase';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';

const EditProduct = ({showEditModal,product}) => {
    const [productName, setProductName] = useState(product.productName)
    const [price, setPrice] = useState(product.price)
    const [file, setFile] = useState(null)
    const [image, setImage] = useState(product.image)
    const slip_sizes = product?.sizes ? product.sizes.join(',') : '';
    const [size,setSize] = useState(slip_sizes)
    const [uploadProgress, setUploadProgress] = useState(0);

    console.log(product);

    const EditProduct = async (e) => {
        e.preventDefault();
        toast.warn('Updating....');
    
        let downloadURL = image; // Initialize with the current image URL
    
        if (file) {
            // If a new file is selected, upload the image
            const storage = getStorage();
            const metadata = {
                contentType: 'image/jpeg', // You might want to dynamically determine this based on the file type
            };
    
            const storageRef = ref(storage, 'images/' + file.name);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    
            try {
                // Wait for the upload to complete
                await uploadTask;
    
                // Get the download URL for the uploaded image
                downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            } catch (error) {
                console.error('Error uploading image:', error);
                toast.error('Error uploading image');
                return;
            }
        }
    
        const productRef = doc(db, 'shop_products', product.id);
    
        try {
            // Update product data in Firestore
            await updateDoc(productRef, {
                productName,
                price,
                sizes: size ? size.split(',').map(Number) : [],
                image: downloadURL,
            });
    
            // Close the modal after a successful Firestore operation
            showEditModal();
            toast.success('Product updated');
            setProductName('');
            setPrice('');
            setFile(null);
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product');
        }
    };
    

    
    return (
        <div className='bg-white p-4 mx-6 md:mx-0 my-4 '>
        <div className='flex justify-end'>
            <IoCloseOutline onClick={showEditModal} className='font-bold hover:scale-125 ease-in duration-150 hover:text-orange-500' />
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
                            type='text'
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
                            onChange={(e) => setFile(e.target.files[0])}
                            accept="image/*" 


                        />
                    </div>
                </div>
                
                <button
                    onClick={EditProduct}
                    className="w-full mt-8 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                    Save changes
                </button>
            </form>
        </div>

    </div>
    );
}

export default EditProduct;
