import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
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
//   // API functions for products
// const productApi = {
//     // Get all products
//     getProducts: async (): Promise<{ data: Product[] }> => {
//       const response = await api.get('/products');
//       return response.data;
//     },
  
//     // Get product by ID
//     getProductById: async (id: number): Promise<Product> => {
//       const response = await api.get(`/products/${id}`);
//       return response.data;
//     },
  
//     // Create a new product
//     createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
//       const response = await api.post('/products', product);
//       return response.data;
//     },
  
//     // Update a product
//     updateProduct: async (product: Product): Promise<Product> => {
//       const response = await api.put(`/products/${product.id}`, product);
//       return response.data;
//     },
  
//     // Delete a product
//     deleteProduct: async (id: number): Promise<void> => {
//       await api.delete(`/products/${id}`);
//     },
//   };
//   // React Query hooks for products
// export const useProducts = () => {
//     return useQuery({
//       queryKey: ['products'],
//       queryFn: productApi.getProducts,
//     });
//   };
  
//   export const useProduct = (id: number) => {
//     return useQuery({
//       queryKey: ['product', id],
//       queryFn: () => productApi.getProductById(id),
//       enabled: !!id, // Only fetch when id is provided
//     });
//   };
  
//   export const useCreateProduct = () => {
//     const queryClient = useQueryClient();
    
//     return useMutation({
//       mutationFn: productApi.createProduct,
//       onSuccess: () => {
//         // Invalidate products list query to refetch data
//         queryClient.invalidateQueries({ queryKey: ['products'] });
//       },
//     });
//   };
  
//   export const useUpdateProduct = () => {
//     const queryClient = useQueryClient();
    
//     return useMutation({
//       mutationFn: productApi.updateProduct,
//       onSuccess: (updatedProduct) => {
//         // Update both the list query and the individual product query
//         queryClient.invalidateQueries({ queryKey: ['products'] });
//         queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id] });
//       },
//     });
//   };
  
//   export const useDeleteProduct = () => {
//     const queryClient = useQueryClient();
    
//     return useMutation({
//       mutationFn: productApi.deleteProduct,
//       onSuccess: (_data, id) => {
//         // Invalidate products list query to refetch data
//         queryClient.invalidateQueries({ queryKey: ['products'] });
//         // Remove the individual product from the cache
//         queryClient.removeQueries({ queryKey: ['product', id] });
//       },
//     });
//   };




const apiBaseUrl = 'https://devapi.uniscore.vn/uri/api';

// API functions for products
const productApi = {
  // Get all products
  getProducts: async (): Promise<{ data: Product[] }> => {
    const response = await api.get(`${apiBaseUrl}/products`); // Sử dụng full URL
    return response.data;
  },

  // Get product by ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get(`${apiBaseUrl}/products/${id}`); // Sử dụng full URL
    return response.data;
  },

  // Create a new product
  createProduct: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await api.post(`${apiBaseUrl}/products`, product); // Sử dụng full URL
    return response.data;
  },

  // Update a product
  updateProduct: async (product: Product): Promise<Product> => {
    const response = await api.put(`${apiBaseUrl}/products/${product.id}`, product); // Sử dụng full URL
    return response.data;
  },

  // Delete a product
  deleteProduct: async (id: number): Promise<void> => {
    await api.delete(`${apiBaseUrl}/products/${id}`); // Sử dụng full URL
  },
};

// React Query hooks for products
export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productApi.getProducts,
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productApi.getProductById(id),
    enabled: !!id, // Only fetch when id is provided
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productApi.createProduct,
    onSuccess: () => {
      // Invalidate products list query to refetch data
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productApi.updateProduct,
    onSuccess: (updatedProduct) => {
      // Update both the list query and the individual product query
      queryClient.invalidateQueries({ queryKey: ['products'] });
      queryClient.invalidateQueries({ queryKey: ['product', updatedProduct.id] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: productApi.deleteProduct,
    onSuccess: (_data, id) => {
      // Invalidate products list query to refetch data
      queryClient.invalidateQueries({ queryKey: ['products'] });
      // Remove the individual product from the cache
      queryClient.removeQueries({ queryKey: ['product', id] });
    },
  });
};  