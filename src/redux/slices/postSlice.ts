import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axios';
import { Post, postState, postPrarams } from '../types/post.types';
import { FetchPostsResponse } from '../types/post.types';



const initialState: postState = {
  posts: [],
  loading: false,
  error: null
};


// Create async thunk for fetching users
export const fetchPosts = createAsyncThunk
  ('post/fetchPosts', async (params: postPrarams = {type : 'new', page : 1, size : 50 } , { rejectWithValue }) => {
    try {
      const response = await api.get<FetchPostsResponse>('/posts',{
        params: {
          type: params.type,
          page: params.page,
          size: params.size,
        },
      });
      return response.data.items;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to fetch posts');
      
    }
  }
);


const postSlice = createSlice({
  name: 'post',
  initialState,
  // xu ly sync action
  reducers:{
  },
  // xu ly async action
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        console.log('fetchposts.pending');
        state.loading = true;
        state.posts = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log('fetchposts.fulfilled');
        console.log('action.payload:', action.payload);
        state.loading = false;
        state.posts = action.payload;  
        console.log('state.posts:', state.posts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        console.log('fetchposts.rejected');
        state.loading = false;
        state.error = action.payload as string || 'An error occurred.';
      });
  },
});



export default postSlice.reducer; 