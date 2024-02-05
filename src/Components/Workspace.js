import React, { useEffect, useState } from 'react';
import { MdDeleteSweep } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import AddProduct from './AddProduct';
import { db } from '../Firebase';
import { collection, query, where, onSnapshot, getFirestore, doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import EditProduct from './EditProduct';
const Workspace = ({ products }) => {
    const [productModal, setProductModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [deleteProductId, setDeleteProductId] = useState(null);
    const [editProductDetails, setEditProductDetails] = useState(null);
    // const [products, setProducts] = useState([])


    const showProductModal = (e) => {
        if (e) {
            e.preventDefault();
        }
        setProductModal(!productModal)
    }
    const showEditModal = (product) => {
        setEditProductDetails(product);
        setEditModal(!editModal);
      };


    const showDeleteModal = (productId) => {
        console.log("Deleting product with ID:", productId)
        setDeleteProductId(productId);
        setDeleteModal(!deleteModal);
    };


    const handleDelete = async (e) => {
        e.preventDefault();
        console.log("Delete button clicked for product ID:", deleteProductId);

        if (deleteProductId) {
            const productToDelete = products.find((product) => product.id === deleteProductId);
            if (productToDelete) {
                console.log("Deleting product:", productToDelete);
                await deleteDoc(doc(db, "shop_products", deleteProductId));
                console.log("Product deleted successfully");
                
            }
        }
        setDeleteModal(false);
        toast.success('Deleted successfully')
    };


   

    return (
        <div>
            <div className=' mt-10  flex flex-row justify-center relative'>
                <div className='grid md:grid-cols-2 gap-2 w-full h-full'>
                    <div className='w-full sm:h-[65vh] h-[75vh] mx-auto md:border-r-2 overflow-y-scroll'>
                        <div className='flex flex-col justify-center items-center'>
                            <p className='text-center'>Shop Product</p>
                            <button
                                onClick={showProductModal}
                                className="w-[300px] mt-4 flex mx-auto items-center justify-center text-white bg-blue-600 hover:bg-blue-700  focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Add Product
                            </button>
                        </div>
                        {products.map((item) => (

                            <div className='' key={item?.id}>
                                <div className='flex justify-between items-center m-6 p-3 shadow-md rounded-md'>
                                    <div className='flex items-center gap-2'>
                                        <img alt='/' src={item.image} className='h-12 w-12 bg-slate-600 rounded-md' />
                                        <div className='flex flex-col'>
                                            <p className='font-bold text-neutral-700 text-xs'>{item?.productName}</p>
                                            <p className='text-orange-600 font-bold  text-xs'>{item?.price}</p>
                                            <p className='text-orange-600 font-bold  text-xs'>sizes: {item?.sizes ? item.sizes.join(',') : 'N/A'}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <button><MdDeleteSweep size={26} onClick={() => {
                                            console.log("Clicked delete for item:", item);
                                            showDeleteModal(item.id);
                                        }} className='text-red-500 hover:scale-125 ease-in duration-150' /></button>
                                        <button onClick={()=>showEditModal(item)}><FaEdit size={24} className='text-blue-500 hover:scale-125 ease-in duration-150' /></button>
                                    </div>
                                </div>

                            </div>

                        ))}

                    </div>

                    <div className='w-full h-full'>
                        <p className='text-center'>Orders</p>
                    </div>
                </div>

            </div>
            <div className={productModal ? `flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-10` : `hidden`}>
                <AddProduct showProductModal={showProductModal} />
            </div>

            {editModal && editProductDetails && (
                <div className='flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-10'>
                    <EditProduct showEditModal={showEditModal} product={editProductDetails} />
                </div>
            )}

            <div className={deleteModal ? `flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black/70 z-10` : `hidden`}>
                <div className='bg-white p-4'>
                    <p>Are you sure you want to delete?</p>
                    <div className='flex justify-center items-center gap-4 mt-4'>
                        <button onClick={handleDelete} className='bg-red-500 p-2  rounded-sm shadow-md text-sm font-bold text-white'>Yes</button>
                        <button onClick={showDeleteModal} className='bg-blue-300 p-2 rounded-sm shadow-md text-sm font-bold text-white'>No</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Workspace;
