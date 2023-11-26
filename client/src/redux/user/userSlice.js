import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

export const userSlices = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      
    },
    updateUserStart:(state)=>{
      state.loading = true;
     
    },
    updateUserSuccess:(state,action)=>{
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserError:(state,action)=>{
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInError, signInSuccess,updateUserStart,updateUserSuccess,updateUserError } = userSlices.actions;


export default userSlices.reducer;

