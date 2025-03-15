import { configureStore } from '@reduxjs/toolkit';
<<<<<<< Updated upstream
import todoReducer from './slices/todoSlice';
import postReducer from './slices/postSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
=======
import cartReducer from '../Cart/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
>>>>>>> Stashed changes
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;