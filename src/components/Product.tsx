import { HeartIcon, EyeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

interface ProductProps {
  image: string;
  name: string;
  price: string;
  rating: number;
  sold: number;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({ image, name, price, rating, sold, isNew }) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg relative group">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-48 object-cover rounded" />
        {isNew && <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">NEW</span>}
        <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition">
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200">
            <HeartIcon className="w-5 h-5 text-red-500" />
          </button>
          <button className="bg-white p-2 rounded-full shadow hover:bg-gray-200">
            <EyeIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
      
      <div className="mt-2">
        <h3 className="text-lg font-semibold truncate">{name}</h3> {/* Tên sản phẩm trên 1 dòng */}
        <div className="flex items-center space-x-3 mt-1">
          <p className="text-red-500 font-bold">{price}</p> {/* Giá */}
          <div className="text-yellow-400 flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < rating ? "★" : "☆"}</span> // Sao đánh giá
            ))}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <ShoppingBagIcon className="w-5 h-5 mr-1" /> {sold} sold {/* Lượt mua */}
          </div>
        </div>
      </div>
      
      <button className="w-full bg-black text-white py-2 mt-3 opacity-0 group-hover:opacity-100 transition">
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
