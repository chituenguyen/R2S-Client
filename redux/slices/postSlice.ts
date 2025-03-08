import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';
import { Post } from '../types/user.types';

interface Topic {
  id: string;
  title: string;
  slug: string;
}

interface Author {
  username: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

interface PostState {
  posts: Post[];
  currentPost: Post | null;
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
      const response = await api.get('/posts');  
      return response.data.items;
    }
  );
  
  export const fetchPostDetail = createAsyncThunk(
    'posts/fetchPostDetail',
    async (id: string) => {
      const response = await api.get(`/posts/${id}`);
      return response.data;
    }
  );

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.posts = [];
        state.error = action.error.message || 'Có lỗi xảy ra';
      })
      .addCase(fetchPostDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
        state.error = null;
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        state.loading = false;
        state.currentPost = null;
        state.error = action.error.message || 'Có lỗi xảy ra';
      });
  }
});

export default postSlice.reducer;