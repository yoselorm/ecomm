import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: []
  }

export const OrderSlice = createSlice({
    initialState,
    name: 'order',
    reducers: {
        addOrder:(state,action)=>{
            state.orders = action.payload
        },

        clearOrder: (state)=>{
            state.orders = []
        }
    }

})

export const {addOrder,clearOrder} = OrderSlice.actions;

export default OrderSlice.reducer;