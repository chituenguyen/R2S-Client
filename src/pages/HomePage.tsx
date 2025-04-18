import { useQuery } from "@tanstack/react-query";
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import * as product from "../redux/api/axios";
import { Product } from "../redux/types/user.types";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiSearch } from "react-icons/ci";

const PRODUCT_PER_PAGE = 8;

function SupportSection() {
  return (
    <div className="flex flex-row justify-center items-center gap-6 sm:gap-4 md:gap-20 lg:gap-20 xl:gap-20 2xl:gap-20 mt-20">
      <div className="flex flex-col items-center text-center">
        <div className="w-[80px] h-[80px] flex items-center justify-center bg-gray-300 rounded-full">
          <div className="w-[58px] h-[58px] flex items-center justify-center bg-white rounded-full">
            <img 
              src="assets/images/fast-delivery-icon-free-vector.jpg" 
              alt="Delivery" 
              className="w-[40px] h-[40px]" 
            />
          </div>
        </div>
        <h3 className="text-[16px] sm:text-[20px] font-semibold mt-4">FREE AND FAST DELIVERY</h3>
        <p className="text-gray-600 text-[12px] sm:text-[14px]">Free delivery for all orders over $140</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="w-[80px] h-[80px] flex items-center justify-center bg-gray-300 rounded-full">
          <div className="w-[58px] h-[58px] flex items-center justify-center bg-white rounded-full">
            <img 
              src="assets/images/customer service.png" 
              alt="CService" 
              className="w-[40px] h-[40px]" 
            />
          </div>
        </div>
        <h3 className="text-[16px] sm:text-[20px] font-semibold mt-4">24/7 CUSTOMER SERVICE</h3>
        <p className="text-gray-600 text-[12px] sm:text-[14px]">Friendly 24/7 customer support</p>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="w-[80px] h-[80px] flex items-center justify-center bg-gray-300 rounded-full">
          <div className="w-[58px] h-[58px] flex items-center justify-center bg-white rounded-full">
            <img 
              src="assets/images/png-clipart-money-back-guarantee-computer-icons-search-button-miscellaneous-service.png" 
              alt="Icon-secure" 
              className="w-[40px] h-[40px]" 
            />
          </div>
        </div>
        <h3 className="text-[16px] sm:text-[20px] font-semibold mt-4">MONEY BACK GUARANTEE</h3>
        <p className="text-gray-600 text-[12px] sm:text-[14px]">We return money within 30 days</p>
      </div>
    </div>
  );
}

function HomePage() {
  const { data, isPending, error } = useQuery({ 
    queryKey: ["product"], 
    queryFn: product.getProductList 
  });
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  
  const currentProductList = useMemo(() => {
    const products = data || [];
    // Filter products based on search term
    const filtered = searchTerm.length > 0
      ? products.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : products;
    return filtered.slice(0, PRODUCT_PER_PAGE);
  }, [data, searchTerm]);

  const handleAddToCart = (product: Product) => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = cart.find((item: Product) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ 
        ...product, 
        quantity: 1,
        color: "red",
        size: null,
        image: product.images[0]
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to cart!", {
      position: "top-right",
      autoClose: 1500,
    });

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  if (error) {
    return <p className="text-red-500 text-center py-10">Failed to load products. Please try again later.</p>;
  }

  const Skeleton = () => (
    <div className="animate-pulse grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6">
      {Array.from({ length: PRODUCT_PER_PAGE }).map((_, index) => (
        <div key={index} className="bg-gray-200 h-60 sm:h-72 rounded-md"></div>
      ))}
    </div>
  );

  return (
    <div className="mx-auto py-12 w-full max-w-[100vw] overflow-x-hidden px-4 xl:px-40">
      <h2 className="text-[36px] font-semibold mb-6 font-[Inter]">Explore Our Products</h2>
      
      {/* Search Bar */}
      <div className="relative w-full max-w-md mb-6">
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden shadow-sm">
          <span className="px-3">
          <CiSearch />
          </span>
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm} 
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(e.target.value.length > 0);
            }}
            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            className="w-full p-2 outline-none"
          />
        </div>

        {showDropdown && searchTerm.length > 0 && currentProductList.length > 0 && (
          <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {currentProductList.map((product: Product) => (
              <li 
                key={product.id} 
                onClick={() => {
                  setSearchTerm(product.name);
                  setShowDropdown(false);
                }}
                className="p-3 hover:bg-gray-100 cursor-pointer transition"
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-[100px]">
        {isPending ? (
          <p className="col-span-4 text-center">Loading...</p>
        ) : error ? (
          <p className="col-span-4 text-center text-red-500">Error loading products</p>
        ) : currentProductList.length > 0 ? (
          currentProductList.map((product: Product) => (
            <div 
              key={product.id}
              className="group rounded-lg bg-white transition duration-300 sm:w-full md:max-w-[270px] lg:max-w-[270px] xl:max-w-[270px] 2xl:max-w-[270px]"
              onClick={() => navigate(`/postpage/${product.id}`)}
            >
              {/* Image Container */}
              <div className="w-full h-[250px] bg-[#F5F5F5] flex flex-col items-center overflow-hidden rounded-md relative">
                <div className="flex-grow flex items-center justify-center">
                  <img 
                    src={product.images[0] || "https://via.placeholder.com/150"} 
                    alt={product.name} 
                    className="max-h-[180px] object-contain" 
                  />
                </div>
                <div className="absolute top-2 right-2 flex flex-col gap-2 items-center">
                  <CiHeart className="w-[34px] h-[34px] cursor-pointer text-gray-600 hover:text-red-500" />
                  <MdOutlineRemoveRedEye className="w-[34px] h-[34px] cursor-pointer text-gray-600 hover:text-blue-500" />
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                  className="absolute bottom-0 left-0 w-full bg-black text-white py-3 text-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  Add To Cart
                </button>
              </div>
              
              {/* Product Info */}
              <h3 className="text-[16px] font-medium mt-3">{product.name}</h3>
              <div className="flex items-center gap-3">
                <span className="text-red-500 text-[16px] font-medium">${product.price}</span>
                <div className="flex items-center gap-1">               
                  {[...Array(5)].map((_, i) => (
                    i < (product.rate || 4) ? (
                      <span key={i} className="text-yellow-500">★</span>
                    ) : (
                      <span key={i} className="text-gray-300">★</span>
                    )
                  ))}
                  <span className="text-gray-500 text-[14px] font-medium">
                    ({product.stock || 50})
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 flex items-center justify-center">
            No products found
          </div>
        )}
      </div>

      <div className="text-center mt-10">
        <button 
          className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-full transition"
          onClick={() => navigate('/products')}
        >
          View All Products
        </button>
      </div>

      <SupportSection />
      
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-10 border-t border-gray-300 pt-2"></div>
    </div>
  );
}

export default HomePage;