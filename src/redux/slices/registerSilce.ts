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
  export const register = async (name: string, email: string, password: string): Promise<any> => {
    const response = await api.post('/auth/register', { name, email, password });
    const { access_token, refresh_token } = response.data;
  
    // Lưu trữ token vào localStorage
    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  
    return response.data;
  };