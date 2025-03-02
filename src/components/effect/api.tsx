import React, { useState, useEffect } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}


const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [clickCount, setClickCount] = useState(0);

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setUsers(data);
      setError('');
    } catch (err) {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch when clickCount reaches 5
    if (clickCount === 5) {
      fetchUsers();
    }
  }, [clickCount]); // Add clickCount as dependency

  // ... existing Skeleton, ErrorMessage, and UserCard components ...

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
            // <Skeleton />
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : (
            users.map(user => (
              <div key={user.id}>{user.name}</div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;