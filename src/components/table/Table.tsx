import { useState, useEffect } from "react";

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
  );
}

function TableRow({
  name,
  email,
  phone,
}: {
  name: string;
  email: string;
  phone: string;
}) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{name}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-500">{phone}</div>
      </td>
    </tr>
  );
}

function Table() {
  const [data, setData] = useState<
    { name: string; email: string; phone: string }[]
  >([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((user: any) => ({
          name: user.name,
          email: user.email,
          phone: user.phone,
        }));
        setData(formattedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <TableHeader />
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, index) => (
          <TableRow key={index} name={row.name} email={row.email} phone={row.phone} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
