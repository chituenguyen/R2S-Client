import axios from 'axios';
import { Product } from '../types/user.types';

// Tạo instance của Axios với baseURL mặc định
const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Lấy danh sách tất cả sản phẩm
export const getProductList = async (): Promise<Product[]> => {
  const { data } = await axios.get("https://devapi.uniscore.vn/uri/api/products");
  return Array.isArray(data.data) ? data.data : [];
};

// Lấy sản phẩm theo ID
export const getProductById = async (productId: number): Promise<Product | null> => {
  try {
    const { data } = await axios.get(`https://devapi.uniscore.vn/uri/api/products/${productId}`);
    if (!data.data) {
      throw new Error("Product not found");
    }
    return Array.isArray(data.data) ? data.data[0] : data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
};

