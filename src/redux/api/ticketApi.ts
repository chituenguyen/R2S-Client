import axios from 'axios';
import { Ticket } from '../types/type';

const API_URL = 'http://localhost:5000/tickets';

// Hàm fetch danh sách vé
export const fetchTickets = async (): Promise<Ticket[]> => {
  const { data } = await axios.get<Ticket[]>(API_URL);
  return data;
};
