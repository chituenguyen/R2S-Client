import { useQuery } from "@tanstack/react-query";
import { getProductList, getProductById } from "../redux/api/axios";
import { Product } from "../redux/types/user.types"; 

export const useGetProduct = () => {
    return useQuery({
        queryKey: ["products"],
        queryFn: getProductList,
        staleTime: 600000, // Giữ cache trong 10 phút 
        refetchOnWindowFocus: false, // Không refetch khi chuyển tab
        retry: false, // Không tự retry khi lỗi 
        select: (data: Product[]) => data.filter((product) => product.is_active) // Chỉ lấy các sản phẩm đang hoạt động
    });
};

export const useGetProductById = (id: number) => {
    return useQuery<Product | null>({
      queryKey: ["product", id],
      queryFn: () => getProductById(id),
      enabled: !!id, // Chỉ fetch nếu ID hợp lệ
      staleTime: 600000,
      refetchOnWindowFocus: false,
      retry: false,
    });
  };