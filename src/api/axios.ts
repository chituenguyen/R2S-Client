import axios from "axios";

const API_URL = "http://localhost:3003/api/auth";

export const signUp = async (email: string, password: string, fullName?: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, {
      email,
      password,
      fullName,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "WRONG";
  }
};
