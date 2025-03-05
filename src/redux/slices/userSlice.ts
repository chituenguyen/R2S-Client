import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '../api/axios';
import { UserState, User } from '../types/user.types';

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

// Create async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',  // Action name
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<User[]>('/todos');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch users');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<User>) => {
      const newTodo:  User = { 
        id : Date.now(),
        email: action.payload.email,
        title: action.payload.title ,
        completed: false,
      };
      state.users.push(newTodo);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
    state.users = state.users.filter((todo) => todo.id !== action.payload);
    },
    resetTodos: (state) => {
      state.users = []; 
    },
  },
    
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addTodo, deleteTodo, resetTodos  } = userSlice.actions;

export default userSlice.reducer;