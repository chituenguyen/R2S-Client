export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!res.ok) throw new Error('Failed to fetch todos');
  return res.json();
};