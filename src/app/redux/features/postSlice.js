// app/redux/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  post: [
    {
      id: Date.now().toString(),
      username: "jidann._00",
      image: "/images.jpeg",
      caption: "Hello world",
      likes: [],
    },
  ],
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.post.push(action.payload)
    },
    likePost: (state, action) => {
      const id = action.payload;
      const item = state.post.find(item => item.id === id);
      const like = item.likes.includes(1);
      if (!like) {
        item.likes.push(1)
      } else {
        const likeIndex = item.likes.indexOf(1);
        item.likes.splice(likeIndex, 1);
      }
    },
  },
});

export const {
  addPost,
  likePost,
} = postSlice.actions;

export default postSlice.reducer;
