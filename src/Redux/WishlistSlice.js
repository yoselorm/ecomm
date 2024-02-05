import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  wishlist: null
}

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addWishlist: (state,action)=>{
        state.wishlist = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addWishlist  } = wishlistSlice.actions

export default wishlistSlice.reducer