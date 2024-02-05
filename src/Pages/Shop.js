import React, { useEffect, useState } from 'react';
import ShopInfo from '../Components/ShopInfo';
import { db } from '../Firebase';
import { collection, query, where, onSnapshot, getFirestore, doc } from "firebase/firestore";
import { useSelector } from 'react-redux';

const Shop = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const productRef = collection(db, 'shop_products');
    
          // Subscribe to updates in real-time
          const unsubscribe = onSnapshot(productRef, (querySnapshot) => {
            const productData = [];
    
            querySnapshot.forEach((doc) => {
              productData.push({ id: doc.id, ...doc.data() });
            });
    
            setProducts(productData);
          });
    
          // Remember to unsubscribe when the component unmounts
          return () => unsubscribe();
        };
    
        fetchData();
      }, []);
      const userdetails = useSelector((state)=>state.auth)
      console.log(products);
      
    
    return (
        <div>
            <ShopInfo products={products}/>
        </div>
    );
}

export default Shop;
