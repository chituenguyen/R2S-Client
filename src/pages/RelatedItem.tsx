// components/RelatedProduct.tsx
import React, { useCallback } from "react";
import { useGetProduct } from "../hooks/useGetProducts";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { CartItem } from "../redux/types/user.types"; 
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";

interface RelatedProductProps {
  currentProductId: number;
}

const RelatedItem = ({ currentProductId }: RelatedProductProps) => {
  const { data: products, isLoading, error } = useGetProduct();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = useCallback((product: CartItem) => {
    addToCart(product);
  }, [addToCart]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;
  if (!Array.isArray(products)) return <p>No products available</p>;

  const getRandomProducts = (currentId: number) => {
    return products
      .filter((p) => p.id !== currentId)
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);
  };

  const relatedProducts = getRandomProducts(currentProductId);

  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-[20px] h-[40px] rounded bg-red-500"></div>
        <span className="text-[16px] text-red-500 font-semibold font-[Inter]">Related Item</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="group rounded-lg bg-white transition duration-300 w-[270px]"
            onClick={() => navigate(`/detail/${product.id}`)}
          >
            <div className="w-[270px] h-[250px] bg-[#F5F5F5] flex flex-col items-center overflow-hidden rounded-md relative">
              <div className="flex-grow flex items-center justify-center">
                <img src={product.images[0]} alt={product.name} className="max-h-[180px] object-contain" />
              </div>
              <div className="absolute top-2 right-2 flex flex-col gap-2 items-center">
                <CiHeart className="h-6 w-6 text-gray-600 cursor-pointer hover:text-red-500 transition" />
                <MdOutlineRemoveRedEye className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-500 transition" />
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0],
                    quantity: 1,
                    color: "red",
                    size: null,
                  });
                }}
                className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
              >
                Add To Cart
              </button>
            </div>
            <h3 className="text-[16px] font-medium mt-3">{product.name}</h3>
            <div className="flex items-center gap-3">
              <a className="text-red-500 text-[16px] font-medium">${product.price}</a>
              <div className="flex text-yellow-400 mb-2">
                {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < product.rate ? "text-yellow-500" : "text-gray-300"}>★</span>
                ))}
              <span className="text-gray-500 text-[14px] font-medium">({product.stock})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedItem;