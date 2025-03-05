import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import api from "../api/axios"
import { Todo } from "../types/user.types"

// export interface UserState {
//   users: User[]
//   loading: boolean
//   error: string | null
// }
// const initialState: UserState = {
//   users: [],
//   loading: false,
//   error: null
// }

export interface TodoState {
  todos: Todo[]
  loading: boolean
  error: string | null
}
const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null
}

// Create async thunk for fetching users
export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  console.log("fetchTodos")
  try {
    const response = await api.get<Todo[]>("/todos")
    return response.data
  } catch (error) {
    // return rejectWithValue('Failed to fetch users');
    console.log(error)
  }
})

const todoSlice = createSlice({
  name: "todos",
  initialState,
  // xu ly sync action
  reducers: {
    themViec: (state, action) => {
      state.todos = [...todos, action.payload]
    },
    xoaViec: (state, action) => {
      state.todos = state.todos.filter((todos) => todos.id !== id)
    },
    resetViec: (state) => {
      state.todos = []
    }
  },
  // xu ly async action
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        console.log("fetchTodos.pending")
        state.loading = true
        state.users = []
        state.error = null
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        console.log("fetchTodos.fulfilled")
        state.loading = false
        state.users = action.payload || []
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        console.log("fetchTodos.rejected")
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const { themViec, xoaViec, resetViec } = todoSlice.actions

export default todoSlice.reducer
