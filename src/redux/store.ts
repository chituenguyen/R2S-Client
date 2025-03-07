import { configureStore } from "@reduxjs/toolkit"
import postResponseReducer from "./slices/userSlice"
import topicReducer from "./slices/topicSlice"

export const store = configureStore({
  reducer: {
    topics: topicReducer,
    posts: postResponseReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
