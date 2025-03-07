import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api/axios"
import { Topic } from "../types/user.types"
import { To } from "react-router-dom"

export interface TopicState {
  topics: Topic | null
  error: string | null
}

const initialStateTopic: TopicState = {
  topics: null,
  error: null
}

export const fetchTopic = createAsyncThunk(
  "topics/fetchTopic",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.get<Topic>("/posts/" + id) // Ensure the type matches API response
      console.log("Fetched API Data1:", response.data) // 🛑 Debugging API response
      return response.data // Must return { total, items: [...] }
    } catch (error) {
      console.log("API Error:", error)
      return rejectWithValue("Failed to fetch posts")
    }
  }
)

const TopicSlice = createSlice({
  name: "topics",
  initialState: initialStateTopic,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopic.pending, (state) => {
        state.topics = null
      })
      .addCase(fetchTopic.fulfilled, (state, action) => {
        state.topics = action.payload || []
      })
      .addCase(fetchTopic.rejected, (state, action) => {
        state.error = action.payload as string
      })
  }
})

export default TopicSlice.reducer
