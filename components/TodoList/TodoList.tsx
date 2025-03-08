import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo, resetTodos } from "../../redux/slices/todoSlice"
import { RootState } from "../../redux/store"

export const TodoList: React.FC = () => {
  // State để quản lý input
  const [input, setInput] = useState("")

  // Lấy dispatch và todos từ Redux
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)

  // Xử lý thêm todo
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      console.log(input.trim())
      dispatch(addTodo(input.trim()))
      setInput("") // Clear input sau khi thêm
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-6 text-red-500">
        My To Do List
      </h1>

      {/* Form thêm todo */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Title..."
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
        >
          Add
        </button>
      </form>

      {/* Danh sách todos */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-2 bg-gray-100 rounded"
          >
            <span className="text-xl font-serif ml-2">{todo.title}</span>
            <button
              onClick={() => dispatch(deleteTodo(todo.id))}
              className="text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Nút Reset */}
      <button
        onClick={() => dispatch(resetTodos())}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
      >
        Reset All
      </button>
    </div>
  )
}
