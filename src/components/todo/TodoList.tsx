import { useQuery } from '@tanstack/react-query';
import { fetchTodos, Todo } from '../../redux/api/todos';

const TodoList = () => {
  const { data, error, isLoading } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {(error as Error).message}</p>;

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Todo List</h2>
        <table className="w-full border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-300 text-gray-800">
              <th className="border border-gray-400 px-4 py-2">ID</th>
              <th className="border border-gray-400 px-4 py-2">Title</th>
              <th className="border border-gray-400 px-4 py-2">Completed</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((todo) => (
              <tr key={todo.id} className="hover:bg-gray-100 text-center">
                <td className="border border-gray-300 px-4 py-2">{todo.id}</td>
                <td className="border border-gray-300 px-4 py-2 text-left">{todo.title}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <input type="checkbox" checked={todo.completed} readOnly />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
