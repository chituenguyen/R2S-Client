import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import postReducer from './slices/postSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;