import axios from "axios";
import { RegisterCredentials, LoginCredentials, LoginResponse, CartItem, Order } from "../user/auth";

export const fetchProducts = async () => {
    const {data} = await axios.get("http://localhost:3000/api/products")
    return data.data
}

export const fetchProductDetail = async (id: number) =>{
    const {data} = await axios.get(`http://localhost:3000/api/products/${id}`)
    return data
}

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`http://localhost:3000/api/auth/register`, credentials);
    return response.data;
  };
  
export const loginUser = async (credential: LoginCredentials) => {
    const response = await axios.post(`http://localhost:3000/api/auth/login`, credential)
    return response.data
}

export const createOrders = async (orderData: Order) => {
    const response = await axios.post(`http://localhost:3000/api/orders`, orderData)
    return response.data
}