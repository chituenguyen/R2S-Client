import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTodo, deleteTodo, resetTodos } from "../../redux/slices/todoSlice"
import { RootState } from "../../redux/store"

export const TodoList: React.FC = () => {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.todos)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      dispatch(addTodo(input.trim()))
      setInput("")
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg border">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
        My To-Do List
      </h1>

      {/* Form thêm todo */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
          className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
        >
          Add
        </button>
      </form>

      {/* Danh sách todos */}
      <div className="space-y-2">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 border rounded-md bg-gray-50"
            >
              <span className="text-lg text-gray-800">{todo.title}</span>
              <button
                onClick={() => dispatch(deleteTodo(todo.id))}
                className="text-gray-500 hover:text-gray-700 text-lg"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>

      {/* Nút Reset */}
      {todos.length > 0 && (
        <button
          onClick={() => dispatch(resetTodos())}
          className="mt-6 w-full py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
        >
          Reset
        </button>
      )}
    </div>
  )
}
