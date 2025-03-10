import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../redux/slices/postSlice';
import postDetailReducer from '../redux/slices/postDetailSlice';


export const store = configureStore({
  reducer: {
    posts: postReducer,
    postDetail : postDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;