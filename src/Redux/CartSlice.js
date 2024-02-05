import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// const initialState ={
//     cart: null
// }

// export const cartSlice = createSlice({
//     name:'cart',
//     initialState,
//     reducers:{
//         addToCart : d
        
//     }
// })



export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id && item.size === newItem.size);

      if (existingItem) {
       toast('Already exists in cart')
       return;
      } else {
        // Item doesn't exist, add it to the cart
        state.items.push(newItem);
      }
    },
   
    removeItem: (state, action) => {
      const { id, size } = action.payload;
      state.items = state.items.filter(item => item.id !== id || item.size !== size);
    },
    clearCart: (state) => {
      // Set the entire cart state back to its initial state
      state.items = [];
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }
      
    },
    
  },
});

export const { addItem, removeItem, updateQuantity,clearCart } = cartSlice.actions;
export default cartSlice.reducer;
