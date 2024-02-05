import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Home from "./Pages/home";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Shop from "./Pages/Shop";
import Dashboard from "./Pages/dashboard";
import SignUp from "./Pages/SignUp";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { userInfo, user_auth, setLoading } from './Redux/AuthSlice'
import Cart from "./Pages/Cart";
import Wishlist from "./Pages/Wishlist";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { addWishlist } from "./Redux/WishlistSlice";
import 'react-toastify/dist/ReactToastify.css';
import Checkout from "./Pages/Checkout";
import { addOrder,clearOrder } from "./Redux/OrderSlice";

function App() {
  // Wrap the entire component tree inside BrowserRouter
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current route is "/login"
  const isLoginPage = location.pathname === "/login";
  const isSignupPage = location.pathname === "/signup";
  const cartPage = location.pathname === "/cart"
  const auth = getAuth()
  const userDetails = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect(()=>{
    if(location.pathname === '/cart'){
      dispatch(clearOrder())
    }
  })

  useEffect(() => {
    const handleAuthentication = (authUser) => {
      dispatch(setLoading(false))

      if (authUser) {
        const userInfoPayload = {
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          // Add other necessary properties
        };
        dispatch(user_auth(true));
        dispatch(userInfo(userInfoPayload));
      } else {
        dispatch(user_auth(false));
        dispatch(userInfo(null));
        // Redirect to login page if trying to access protected pages
        if (location.pathname === "/wishlist" || location.pathname === "/cart") {
          navigate("/login");
        }
      }
    };
    dispatch(setLoading(true));
    const unsubscribe = auth.onAuthStateChanged(handleAuthentication);

    return () => unsubscribe(); // Cleanup the listener when component unmounts
  }, [dispatch, location.pathname, navigate]);



  // fetching wishlist and dispatching
  const [wishlist, setWishlist] = useState([])

  const admin = userDetails?.user[0]?.email
  
  



  useEffect(() => {
    const fetchData = async () => {
      if (userDetails.authentication && userDetails.user?.[0]?.uid) {
        const userUid = userDetails.user[0].uid;

        try {
          const wishlistRef = collection(db, 'wishlist');
          const userDocRef = doc(wishlistRef, userUid);

          // Get the user's wishlist document
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            // Document exists, fetch the wishlist array
            const wishlistData = userDocSnapshot.data().wishlist || [];

            //console.log('Fetched Wishlist Data:', wishlistData);


            setWishlist(wishlistData);
            dispatch(addWishlist(wishlistData))

          } else {
            //console.log('Wishlist document not found for user:', userUid);
            // You may handle the case where the wishlist document doesn't exist
          }
        } catch (error) {
          console.error('Error fetching wishlist:', error.message);
          // Provide error feedback to the user

        }
      }
    };

    fetchData();
  }, [userDetails]);

  const wishlistinfo = useSelector((state) => state.wishlist)








  return (
    <>
      {!isLoginPage && !isSignupPage && !cartPage && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/dashboard" element={admin === 'admin@mannystore.com' ? <Dashboard /> : <Navigate to="/shop" />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;
