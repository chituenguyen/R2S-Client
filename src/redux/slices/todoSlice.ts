import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
    id: string
    title: string
}

interface TodoState {
    todos: Todo[]
}

const initialState: TodoState = {
    todos: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      addTodo: (state, action: PayloadAction<string>) => {
        state.todos.push({
          id: String(Math.random()),
          title: action.payload,
        });
      },
      deleteTodo: (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      },
      resetTodos: (state) => {
        state.todos = [];
      }
    }
  });
  
  export const { addTodo, deleteTodo, resetTodos } = todoSlice.actions;
  export default todoSlice.reducer;