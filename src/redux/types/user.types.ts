export interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

export interface Post {
  id: string;           
  title: string;
  slug: string;
  createdAt: string;
  updatedAt: string;    
  description: string;  
  content: string;      
  thumbnail: string;    
  author: {
    username: string;
    firstName: string;
    lastName: string;
    avatar: string;
  };
  topics: {
    id: string;
    title: string;
    slug: string;
  }[];
  bookmarks: number;
  comments: number;     
  claps: number;       
  timeRead: number;    
  views: number; 
  viewCount: number;
  isPublic: number;
  market: string;      
}

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

// Định nghĩa kiểu dữ liệu cho sản phẩm trong giỏ hàng
export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  color: string;
  size: string | null;
}

export interface iProduct {
  id: string;
  title: string;
  salePrice: number;
  images?: { url: string; title?: string }[];
}

export interface iCartItem extends iProduct {
  quantity: number;
}