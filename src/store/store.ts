import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("access_token"),
  login: (token) => {
    localStorage.setItem("access_token", token); 
    set({ isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("access_token"); 
    set({ isAuthenticated: false });
  },
}));

interface CartState {
  cartCount: number;
  updateCartCount: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  cartCount: JSON.parse(localStorage.getItem("cart") || "[]").reduce(
    (acc: number, item: any) => acc + item.quantity,
    0
  ),

  updateCartCount: () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
    set({ cartCount: totalItems });
  },
}));