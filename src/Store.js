import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Redux/AuthSlice';
import wishlistReducer from './Redux/WishlistSlice';
import cartReducer from './Redux/CartSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session'; 
import orderReducer from './Redux/OrderSlice';
import billingDetailsReducer from './Redux/BillingDetailsSlice';

const persistConfig = {
  key: 'root',
  storage,
};
const persistSessionConfig = {
  key: 'root',
  storage: storageSession, 
};

const persistedAuthReducer = persistReducer(persistSessionConfig, authReducer);
const persistedWishlistReducer = persistReducer(persistConfig, wishlistReducer);
const persistedCartReducer = persistReducer(persistSessionConfig, cartReducer);
const persistedOrderReducer = persistReducer(persistSessionConfig, orderReducer);
const persistedBillingReducer = persistReducer(persistSessionConfig, billingDetailsReducer);




export const store = configureStore({
  reducer: {
    auth:persistedAuthReducer,
    wishlist:persistedWishlistReducer,
    cart: persistedCartReducer,
    order:persistedOrderReducer,
    billing: persistedBillingReducer
  },
})

export const persistor = persistStore(store);