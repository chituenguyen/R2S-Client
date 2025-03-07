import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { themTen } from '../../redux/slices/userSlice';
import type { User } from '../../redux/types/user.types';

const UserModal: FC<{ isOpen: boolean; closeModal: () => void; addUser: (name: string) => void }> = ({
  isOpen,
  closeModal,
  addUser,
}) => {
  const [name, setName] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addUser(name);
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Thêm Người Dùng</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nhập tên..."
            className="w-full p-2 border rounded-md outline-none focus:ring focus:ring-indigo-300"
            required
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 border rounded-md">
              Hủy
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const addUser = (name: string) => {
    dispatch(themTen(name));
  };

  const { users, loading, error } = useSelector((state: any) => state.nameofUserReducer);

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Danh sách người dùng</h1>

      <div className="flex justify-center mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md"
        >
          + Thêm người dùng
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-center">Đang tải...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="space-y-3">
          {users.map((user: any) => (
            <div key={user.id} className="p-3 border rounded-md bg-white shadow-sm">
              {user.name}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && <UserModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} addUser={addUser} />}
    </div>
  );
};

export default UserList;
