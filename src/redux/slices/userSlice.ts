import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api/axios"
import { PostItem, PostsResponse, Topic } from "../types/user.types"
import { PostItem } from "./../types/user.types"

export interface PostResponseState {
  posts: { total: number; items: PostItem[] }
  error: string | null
}

const initialState: PostResponseState = {
  posts: { total: 0, items: [] },
  error: null
}

// Create async thunk for fetching users
export const fetchPostResponse = createAsyncThunk(
  "posts/fetchPostResponse",
  async () => {
    try {
      const response = await api.get<PostsResponse>("/posts") // Ensure the type matches API response
      console.log("Fetched API Data:", response.data) // 🛑 Debugging API response
      return response.data // Must return `{ total, items: [...] }`
    } catch (error) {
      console.error("API Error:", error)
      return rejectWithValue("Failed to fetch posts")
    }
  }
)

const PostResponseSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostResponse.pending, (state) => {
        state.posts = { total: 0, items: [] }
      })
      .addCase(fetchPostResponse.fulfilled, (state, action) => {
        console.log("Redux Updated State:", action.payload) // 🛑 Debug Redux update
        state.posts = action.payload || { total: 0, items: [] }
      })
      .addCase(fetchPostResponse.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})

export default PostResponseSlice.reducer
