import { useState, useEffect } from "react"
import { getRoleStyles } from "../../utils"
import { error } from "console"

interface User {
  id: number
  name: string
  email: string
  phone: string
}

const DataTable = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error("error", error)
        setLoading(false)
      })
  }, [])
}

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
          Role
        </th>
      </tr>
    </thead>
  )
}

function TableRow({
  name,
  email,
  phone
}: {
  name: string
  email: string
  phone: string
}) {
  const { bg, text, border } = getRoleStyles(role)
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{data.name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{data.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full`}
        >
          {data.phone}
        </span>
      </td>
    </tr>
  )
}

function Table() {
  // const [data] = useState([
  //   { name: "John Doe", email: "john@example.com", role: "Admin" },
  //   { name: "Jane Smith", email: "jane@example.com", role: "User" },
  //   { name: "Jim Beam", email: "jim@example.com", role: "Inactive" }
  // ])
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <TableHeader />

      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <TableRow
            key={index}
            name={row.name}
            email={row.email}
            phone={row.phone}
          />
        ))}
      </tbody>
    </table>
  )
}

export default Table
