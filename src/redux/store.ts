import { configureStore } from '@reduxjs/toolkit';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import todoReducer from './slices/todoSlice';
import postReducer from './slices/postSlice'

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
=======
=======
>>>>>>> Stashed changes
import cartReducer from '../Cart/cartSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;