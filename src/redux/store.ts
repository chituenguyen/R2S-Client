import { configureStore } from '@reduxjs/toolkit';
import postDetailReducer from './slices/userSlice';
export const store = configureStore({
  reducer: {
    postDetail: postDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

