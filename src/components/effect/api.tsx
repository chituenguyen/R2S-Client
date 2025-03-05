import React, { FC, useEffect, useState } from "react"
import {
  fetchTodos,
  resetViec,
  themViec,
  xoaViec
} from "../../redux/slices/userSlice"
import type { Todo } from "../../redux/types/user.types"
import { useDispatch, useSelector } from "react-redux"

const UserModal: FC<{ isOpen: boolean; motcaiham: (name: string) => void }> = ({
  isOpen,
  motcaiham
}) => {
  const [name, setName] = useState<string>("")

  const themTenTrongModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    motcaiham(name)
  }
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add New User</h2>
        <form onSubmit={themTenTrongModal} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Add User
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const UserList: React.FC = () => {
  // const [clickCount, setClickCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch = useDispatch()

  const themViecFunction = (title: string) => {
    dispatch(themViec(title))
  }

  const xoaViecFunction = (id: number) => {
    dispatch(xoaViec(id))
  }

  const resetViecFunction = () => {
    dispatch(resetViec())
  }

  const { users, loading, error } = useSelector(
    (state: any) => state.nameofUserReducer
  )

  // const handleClick = () => {
  //   setClickCount(prev => prev + 1);
  // };

  const Skeleton = () => (
    <div className="animate-pulse">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg bg-white">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  )

  const ErrorMessage = () => (
    <div className="p-4 text-red-500 bg-red-100 rounded-lg">
      <p className="text-center">{error}</p>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 text-center">
        {/* <p className="text-lg mb-4">
          Clicks remaining: {5 - clickCount}
        </p>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={clickCount >= 5}
        >
          Click me ({clickCount}/5)
        </button> */}

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Open modal
        </button>
      </div>

      <div className="space-y-4">
        <h1 className="text-2xl font-bold mb-6">User List</h1>
        {loading ? (
          <Skeleton />
        ) : error ? (
          <ErrorMessage />
        ) : (
          users.map((user: any) => <div key={user.id}>{user.name}</div>)
        )}
      </div>

      {isModalOpen && (
        <UserModal isOpen={isModalOpen} motcaiham={themTenFunction} />
      )}
    </div>
  )
}

export default UserList
