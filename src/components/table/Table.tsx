import { useState } from "react";
import { getRoleStyles } from "../../utils";

function TableHeader() {
  return (
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Phone
        </th>
      </tr>
    </thead>
  )
}

function TableRow({name, email, phone}: {name: string, email: string, phone: string}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
          {phone}
      </td>
    </tr>
  )
}

function Table() {
  const [data, ] = useState([
    { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    { name: 'Jim Beam', email: 'jim@example.com', role: 'Inactive' },
  ])
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <TableHeader />

      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <TableRow key={index} name = {row.name} email = {row.email} phone= {row.role} />
        ))}
      </tbody>
    </table>
  )
}

export default Table;