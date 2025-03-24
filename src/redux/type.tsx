import exp from "constants";

export interface Product {
    id: number;
    name: string;
    price: string;
    description: string;
    images: string[];
    category: string;
    brand: string;
    rate: number;
    stock: number;
    is_active: boolean;
}

export interface LoginData {
    email: string; 
    password: string;
}

export interface SignUpData {
  // ten: string;
  email: string;
  password: string;
}

export interface CartItem{
  id: number;
  name: string;
  img: string;
  price: string;
  quantity: number;
}
export interface items {
  productId: number;
  quantity: number;
}

export interface Orders {
  userId: number;
  name: string;
  address: string;
  items: items[];
}

export interface orderData {
  name: string;
  LastName: string;
  address: string;
  apartment: string;
  city: string;
  phone: string;
  email: string;
}
  
  




