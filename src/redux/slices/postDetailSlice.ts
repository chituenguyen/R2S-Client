import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axios';
import { postDetail, postDetailState } from '../types/post.types';

const initialState: postDetailState = {
    postDetail: [],
    loading: false,
    error: null
};

export const fetchPostDetail = createAsyncThunk(
  'postDetail/fetchPostDetail', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<postDetail>('/posts/9845516e-d039-40fb-9bea-df803d922f50');
      console.log('response.data:',response.data)
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue('Failed to fetch post detail');
    }
  }
);

const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetail.pending, (state) => {
        console.log('fetchposts.pending');
        state.loading = true;
        state.postDetail = [];
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        console.log('fetchposts.fulfilled');
        console.log('action.payload:', action.payload);
        state.loading = false;
        state.postDetail = [action.payload];  
        console.log('state.postDetail:', state.postDetail);
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        console.log('fetchposts.rejected');
        state.loading = false;
        state.error = action.payload as string || 'An error occurred.';
      });
  },
});

export default postDetailSlice.reducer;