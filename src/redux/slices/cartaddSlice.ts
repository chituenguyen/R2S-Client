import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios";

export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    brand: string;
    rate: number;
    stock: number;
    is_active: boolean;
  }
  interface OrderItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    totalPrice: number;
    image?: string;
  }
export const useProducts = () => {
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await api.get("/products");
      return response.data;
    }
  });

  const addToCart = (product: Product) => {
    // Lấy dữ liệu giỏ hàng từ localStorage
    const cart: OrderItem[] = JSON.parse(localStorage.getItem("orders") || "[]");
  
    // Kiểm tra xem sản phẩm đã có trong giỏ hàng chưa
    const existingProductIndex = cart.findIndex((item: OrderItem) => item.id === product.id);
    if (existingProductIndex !== -1) {
      // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng và tổng giá
      cart[existingProductIndex].quantity += 1;
      cart[existingProductIndex].totalPrice = cart[existingProductIndex].price * cart[existingProductIndex].quantity;
    } else {
      // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
      const newProduct: OrderItem = { ...product, quantity: 1, totalPrice: product.price };
      cart.push(newProduct);
    }
  
    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem("orders", JSON.stringify(cart));
  };

  return { data, isLoading, error, addToCart };
};
