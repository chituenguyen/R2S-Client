import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';
import {  User } from '../types/user.types';

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}
const initialState: UserState = {
  users: [],
  loading: false,
  error: null
};


// Create async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    console.log('fetchUsers');
    try {
      const response = await api.get<User[]>('/users');
      return response.data;
    } catch (error) {
      // return rejectWithValue('Failed to fetch users');
      console.log(error);
    }
  }
);


const userSlice = createSlice({
  name: 'users',
  initialState,
  // xu ly sync action
  reducers:{
    themTen: (state, action) => {
      //action.payload la user ma mn nhap vao.
      state.users.push({
        id: 1,
        name: action.payload,
        email: 'test@test.com',
        address: {
          street: '123 Main St',
          city: 'Anytown',
          zipcode: '12345'
        },
        company: {
          name: 'Test Company'
        }
      })
    }
  },
  // xu ly async action
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        console.log('fetchUsers.pending');
        state.loading = true;
        state.users = [];
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        console.log('fetchUsers.fulfilled');
        state.loading = false;
        state.users = action.payload || [];
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        console.log('fetchUsers.rejected');
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { themTen } = userSlice.actions;

export default userSlice.reducer; 