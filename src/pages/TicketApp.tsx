import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TicketList from './../components/TicketList';

// Tạo Query Client
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>🚇 Metro Ticket Booking</h1>
        <TicketList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
