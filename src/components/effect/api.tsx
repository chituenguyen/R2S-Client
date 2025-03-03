import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchUsers } from '../../redux/slices/userSlice';
import type { User } from '../../redux/types/user.types';

const UserList: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);
  console.log(users, loading, error);

  useEffect(() => {
    if (clickCount === 5) {
      dispatch(fetchUsers());
    }
  }, [clickCount, dispatch]);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  // Skeleton component
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
  );

  // Error component
  const ErrorMessage = () => (
    <div className="p-4 text-red-500 bg-red-100 rounded-lg">
      <p className="text-center">{error}</p>
    </div>
  );

  // User card component
  const UserCard: React.FC<{ user: User }> = ({ user }) => (
    <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-gray-800">{user.name}</h3>
      <p className="text-gray-600">{user.email}</p>
      <p className="text-gray-500 text-sm">{user.company.name}</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6 text-center">
        <p className="text-lg mb-4">
          Clicks remaining: {5 - clickCount}
        </p>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          disabled={clickCount >= 5}
        >
          Click me ({clickCount}/5)
        </button>
      </div>

      {clickCount < 5 ? (
        <div className="text-center text-gray-600">
          Keep clicking! Data will load after 5 clicks.
        </div>
      ) : (
        <div className="space-y-4">
          <h1 className="text-2xl font-bold mb-6">User List</h1>
          {loading ? (
            <Skeleton />
          ) : error ? (
            <ErrorMessage />
          ) : (
            users.map(user => (
              <UserCard key={user.id} user={user} />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;