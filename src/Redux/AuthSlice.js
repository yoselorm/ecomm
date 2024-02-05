import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authentication: false,
  user: [],
  loading: true,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userInfo: (state, action) => {
      state.user = [action.payload]
    },
    user_auth: (state, action) => {
      state.authentication = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { userInfo, user_auth,setLoading } = authSlice.actions

export default authSlice.reducer