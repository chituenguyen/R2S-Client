import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';
import {  User } from '../types/user.types';


const initialState = {
  postDetail: {},
  loading: false,
  error: null
};


// Create async thunk for fetching users
export const fetchPostDetail = createAsyncThunk(
  'post/fetchPostDetail',
  async (id: string) => {
    try {
      const response = await api.get<User[]>('/posts/' + id);
      return response.data;
    } catch (error) {
      // return rejectWithValue('Failed to fetch users');
      console.log(error);
    }
  }
);


const postDetailSlice = createSlice({
  name: 'postDetail',
  initialState,
  // xu ly sync action
  reducers:{
  },
  // xu ly async action
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetail.pending, (state) => {
        console.log('fetchUsers.pending');
        state.postDetail = [];
      })
      .addCase(fetchPostDetail.fulfilled, (state, action) => {
        console.log('fetchUsers.fulfilled');
        state.postDetail = action.payload || [];
      })
      .addCase(fetchPostDetail.rejected, (state, action) => {
        console.log('fetchUsers.rejected');
      });
  },
});

export default postDetailSlice.reducer; 