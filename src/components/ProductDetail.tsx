import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
}

const fetchProduct = async (id: string) => {
  const response = await fetch(`http://localhost:3003/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data.data[0];
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
    enabled: !!id,
  });
  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }
  if (error) {
    return <div className="text-center py-10 text-red-500">Error loading product.</div>;
  }
  const productImage = `/assets/images/${id}.jpg`;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <img src={productImage} alt={product.name} className="w-full rounded-lg shadow-lg" />
      </div>      
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-2xl font-semibold text-red-500 my-4">${product.price}</p>
        <p className="text-gray-700 mb-4">{product.description}</p>       
        <div className="mb-4">
          <span className="font-semibold">Colors:</span>
          <div className="flex space-x-2 mt-2">
            <div className="w-6 h-6 bg-red-500 rounded-full border cursor-pointer"></div>
            <div className="w-6 h-6 bg-blue-500 rounded-full border cursor-pointer"></div>
            <div className="w-6 h-6 bg-black rounded-full border cursor-pointer"></div>
          </div>
        </div>       
        <div className="mb-4">
          <span className="font-semibold">Size:</span>
          <div className="flex space-x-2 mt-2">
            <button className="px-3 py-1 border rounded">S</button>
            <button className="px-3 py-1 border rounded">M</button>
            <button className="px-3 py-1 border rounded">L</button>
            <button className="px-3 py-1 border rounded">XL</button>
          </div>
        </div>       
        <div className="flex items-center space-x-4 mt-4">
          <input type="number" defaultValue={1} min={1} className="w-16 text-center border rounded p-2" />
          <button className="px-6 py-3 bg-red-500 text-white rounded-lg shadow">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
