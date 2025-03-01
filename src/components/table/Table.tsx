import React from 'react';

const Table: React.FC = () => {
  const data = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 },
  ];

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border border-gray-300 px-4 py-2">ID</th>
          <th className="border border-gray-300 px-4 py-2">Name</th>
          <th className="border border-gray-300 px-4 py-2">Age</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id} className="text-center">
            <td className="border border-gray-300 px-4 py-2">{row.id}</td>
            <td className="border border-gray-300 px-4 py-2">{row.name}</td>
            <td className="border border-gray-300 px-4 py-2">{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
