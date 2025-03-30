import api from "../api/axios";

export interface User {
    id: number;
    email: string;
    password: string;
    roles: string[];
    refresh_token: string | null;
    created_at: string;
    updated_at: string;
  }

  
export const login = async (email: string, password: string): Promise<User> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;  // Giả sử API trả về dữ liệu người dùng với cấu trúc User
  };