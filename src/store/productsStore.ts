import { create } from "zustand";

interface Product {
  id: number;
  name: string;
  images: string;
  price: number;
  rating: number;
  sold: number;
}

interface ProductStore {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  loading: true,
  fetchProducts: async () => {
    try {
      const response = await fetch("https://uritrainer.ddns.net/api/products");
      const data = await response.json();
      set({ products: data.data, loading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ loading: false });
    }
  },
}));
