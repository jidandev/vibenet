// app/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import postReducer from './features/postSlice';
import commentReducer from './features/commentSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comments: commentReducer,
  },
});

export default store;
