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
  images: string []; 
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
  images: string;
  quantity: number;
  color: string;
  size: string | null;
}

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}

export interface CustomerInfo {
  firstName: string;
  companyName?: string;
  streetAddress: string;
  apartment?: string;
  townCity: string;
  phoneNumber: string;
  email: string;
  saveInfo: boolean;
  paymentMethod: string;
  orderTotal: number;
  discount: number;
  items: OrderItem[];
}

export interface Order {
  id: number
  user_id: number
  name: string
  address: string
  total_amount: string
  status: string
  created_at: string
  updated_at: string
}