import { useNavigate } from "react-router-dom";
import { HeartIcon, EyeIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useCartStore } from "../store/store"; 

interface ProductProps {
  id: number;
  image: string;
  name: string;
  price: number;
  rating: number;
  sold: number;
  isNew?: boolean;
}

const ProductCard: React.FC<ProductProps> = ({ id, image, name, price, rating, sold, isNew }) => {
  const navigate = useNavigate();
  const { updateCartCount } = useCartStore(); 

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); 

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex((item: any) => item.id === id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ id, name, image, price, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount(); 
  };

  return (
    <div className="border p-4 rounded-lg shadow-lg relative group">
      <div className="relative cursor-pointer" onClick={() => navigate(`/product/${id}`)}>
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
        <h3 className="text-lg font-semibold truncate">{name}</h3>
        <div className="flex items-center space-x-3 mt-1">
          <p className="text-red-500 font-bold">${price}</p>
          <div className="text-yellow-400 flex space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>{i < rating ? "★" : "☆"}</span>
            ))}
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <ShoppingBagIcon className="w-5 h-5 mr-1" /> {sold} sold
          </div>
        </div>
      </div>
      
      <button 
        className="w-full bg-black text-white py-2 mt-3 opacity-0 group-hover:opacity-100 transition"
        onClick={handleAddToCart}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
