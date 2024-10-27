// app/redux/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: 0,
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  username: "",
  error: "",
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    setLastName: (state, action) => {
      state.lastName = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setStep,
  setEmail,
  setFirstName,
  setLastName,
  setPassword,
  setUsername,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
