import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoList from '../components/todo/TodoList';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <TodoList />
      </div>
    </QueryClientProvider>
  );
};

export default App;

