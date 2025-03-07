import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Todo {
    id: string
    title: string
}

interface TodoState {
    todos: Todo[]
}

// Lấy dữ liệu từ localStorage nếu có, nếu không thì dùng mảng rỗng
const loadTodos = (): Todo[] => {
    const savedTodos = localStorage.getItem('todos')
    return savedTodos ? JSON.parse(savedTodos) : []
}

// Hàm lưu todos vào localStorage
const saveTodos = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}

const initialState: TodoState = {
    todos: loadTodos(),
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo = {
                id: String(Date.now()), // Dùng timestamp thay vì Math.random()
                title: action.payload,
            }
            state.todos.push(newTodo)
            saveTodos(state.todos) // Lưu vào localStorage
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
            saveTodos(state.todos) // Cập nhật localStorage
        },
        resetTodos: (state) => {
            state.todos = []
            localStorage.removeItem('todos') // Xóa localStorage khi reset
        }
    }
})

export const { addTodo, deleteTodo, resetTodos } = todoSlice.actions
export default todoSlice.reducer
