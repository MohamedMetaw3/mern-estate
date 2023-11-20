import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlices = createSlice({
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
      state.currentUser = null;
    },
  },
});

export const { signInStart, signInError, signInSuccess } = userSlices.actions;

const userReducer = userSlices.reducer;

export default userReducer;
