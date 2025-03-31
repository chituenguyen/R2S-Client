import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";

const fetchProduct = async (id) => {
  const response = await fetch(`http://localhost:3003/api/products/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }
  const data = await response.json();
  return data.data[0];
};

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });

  const [selectedImage, setSelectedImage] = useState(`/assets/images/${id}.jpg`);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isMinusPressed, setIsMinusPressed] = useState(false);
  const [isPlusPressed, setIsPlusPressed] = useState(false);

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error loading product.</div>;

  return (
    <div className="flex px-[100px] gap-4 items-start">
      <div className="flex">
        <div className="flex flex-col space-y-4 mr-6">
          {[1, 2, 3, 4].map((num) => (
            <img
              key={num}
              src={`/assets/images/${num}.jpg`}
              alt={`Thumbnail ${num}`}
              className="w-[150px] h-[138px] object-cover rounded-lg cursor-pointer border hover:border-red-500 transition"
              onClick={() => setSelectedImage(`/assets/images/${id}.jpg`)}
            />
          ))}
        </div>
        <img
          src={selectedImage}
          alt={product.name}
          className="w-[650px] h-[600px] object-cover rounded-lg shadow-lg bg-gray-100"
        />
      </div>

      <div className="flex-1 ml-[90px]">
        <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
        <div className="flex items-center space-x-2 mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
          </div>
          <span className="text-gray-500">({product.reviews} Reviews)</span>
        </div>
        <p className="text-2xl my-4">${product.price}</p>
        <p className="text-gray-700 text-sm mb-4">{product.description}</p>

        <div className="flex items-center mb-4">
          <span className="font-semibold mr-3">Colours:</span>
          <div className="flex space-x-2">
            {["blue", "red"].map((color) => (
              <div
                key={color}
                className={`w-4 h-4 rounded-full border cursor-pointer ${color === "blue" ? "bg-blue-500" : "bg-red-500"} 
                ${selectedColor === color ? "border-black" : ""}`}
                onClick={() => setSelectedColor(color)}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex items-center mb-4">
          <span className="font-semibold mr-3">Size:</span>
          <div className="flex space-x-2">
            {["XS", "S", "M", "L", "XL"].map((size) => (
              <button
                key={size}
                className={`px-3 py-1 border rounded ${selectedSize === size ? "bg-red-500 text-white" : ""}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-4 mt-4">
          <div className="flex items-center border rounded overflow-hidden">
            <button
              className={`px-2 py-2 ${isMinusPressed ? "bg-white text-red-500" : "bg-red-500 text-white"}`}
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              onMouseDown={() => setIsMinusPressed(true)}
              onMouseUp={() => setIsMinusPressed(false)}
              onMouseLeave={() => setIsMinusPressed(false)}
            >
              <FiMinus />
            </button>
            <input
              value={quantity}
              min={1}
              className="w-[70px] text-center font-semibold border-none outline-none"
              readOnly
            />
            <button
              className={`px-2 py-2 ${isPlusPressed ? "bg-white text-red-500" : "bg-red-500 text-white"}`}
              onClick={() => setQuantity((q) => q + 1)}
              onMouseDown={() => setIsPlusPressed(true)}
              onMouseUp={() => setIsPlusPressed(false)}
              onMouseLeave={() => setIsPlusPressed(false)}
            >
              <FiPlus />
            </button>
          </div>
          <button className="px-10 py-2 bg-red-500 text-white rounded-lg shadow">Buy Now</button>
          <button className="p-3 border border-gray-300 rounded-lg">
            <FaHeart className="cursor-pointer" style={{ fill: "none", stroke: "black", strokeWidth: "40" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
