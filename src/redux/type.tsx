export default interface Product {
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
  };

export default interface LoginData {
    identifier: string; // Có thể là email hoặc số điện thoại
    password: string;
}

