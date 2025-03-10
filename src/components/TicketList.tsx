import { useQuery } from '@tanstack/react-query';
import { fetchTickets } from '../redux/api/ticketApi';
import { Ticket } from '../redux/types/type';
import { useState } from 'react';

const TicketList = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Sử dụng React Query để fetch API
  const { data, isLoading, error, refetch } = useQuery<Ticket[], Error>({
    queryKey: ['tickets'],
    queryFn: fetchTickets,
    refetchOnWindowFocus: true, // Tự động fetch lại khi quay lại tab
  });

  // Xử lý hiệu ứng khi bấm nút "Làm mới"
  const handleRefetch = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  if (isLoading) return <p className="text-center text-lg">⏳ Đang tải vé...</p>;
  if (error) return <p className="text-red-500 text-center">❌ Lỗi: {error.message}</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">🎫 Danh sách vé Metro</h2>

      <button
        onClick={handleRefetch}
        className={`w-full py-2 rounded-md text-white font-semibold transition ${
          isRefreshing ? 'bg-blue-400 animate-pulse' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        🔄 Làm mới
      </button>

      <ul className="mt-4 space-y-2">
        {data?.map(ticket => (
          <li
            key={ticket.id}
            className="p-3 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition"
          >
            <span className="font-medium">{ticket.name}</span> - <span className="text-blue-600">{ticket.price.toLocaleString()} VND</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TicketList;
