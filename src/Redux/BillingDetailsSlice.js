import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    billing: []
  }

export const BillingSlice = createSlice({
    initialState,
    name: 'billing',
    reducers: {
        addBillingDetails:(state,action)=>{
            state.billing = action.payload
        },

        clearBillingDetails: (state)=>{
            state.billing = []
        }
    }

})

export const {addBillingDetails,clearBillingDetails} = BillingSlice.actions;

export default BillingSlice.reducer;