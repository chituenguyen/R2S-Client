import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
    id: string
    title: string
}

interface TodoState {
    todos: Todo[]
}

const loadTodosFromStorage = (): Todo[] => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
}

const initialState: TodoState = {
    todos: loadTodosFromStorage()
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

        localStorage.setItem('todos', JSON.stringify(state.todos));
      },
      deleteTodo: (state, action: PayloadAction<string>) => {
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
        localStorage.setItem('todos', JSON.stringify(state.todos));
      },
      resetTodos: (state) => {
        state.todos = [];

        localStorage.removeItem('todos');
      }
    }
  });
  
  export const { addTodo, deleteTodo, resetTodos } = todoSlice.actions;
  export default todoSlice.reducer;
