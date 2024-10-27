// app/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice';
import postReducer from './features/postSlice';
import commentReducer from './features/commentSlice';
import themeReducer from './features/themeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    comments: commentReducer,
    theme: themeReducer,
  },
});

export default store;
