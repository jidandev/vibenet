// commentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  comments: [],
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    addReply: (state, action) => {
      const { commentId, reply } = action.payload;
      const comment = state.comments.find((c) => c.id === commentId);
      if (comment) {
        comment.replies = comment.replies || [];
        comment.replies.push(reply);
      }
    },
    addSubReply: (state, action) => {
      // const { commentId, reply, parentId } = action.payload;
      // const parent = state.comments.find((c) => c.id === parentId);
      // const comment = parent.replies.find((c) => c.id === commentId);
      // if (comment) {
      //   comment.replies = comment.replies || [];
      //   comment.replies.push(reply);
      // }
      const { parentId, reply } = action.payload;
      const comment = state.comments.find((c) => c.id === parentId);
      if (comment) {
        comment.replies = comment.replies || [];
        comment.replies.push(reply);
      }
    },
    likeComment: (state, action) => {
      const id = action.payload;
      const item = state.comments.find(item => item.id === id);
      const like = item.likes.includes(1);
      if (!like) {
        item.likes.push(1)
      } else {
        const likeIndex = item.likes.indexOf(1);
        item.likes.splice(likeIndex, 1);
      }
    },
    likeReply: (state, action) => {
      const { id, pId } = action.payload;
      const parent = state.comments.find((c) => c.id === pId);
      const item = parent.replies.find((c) => c.id === id);
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

export const { addComment, addReply, addSubReply, likeComment, likeReply } = commentSlice.actions;
export default commentSlice.reducer;
