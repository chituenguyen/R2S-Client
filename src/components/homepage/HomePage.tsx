import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import { Link } from "react-router-dom"
import { Navigation } from "swiper/modules"
import { useProduct } from "../../useQuery/hooks/useProduct"
import { useMutation } from "@tanstack/react-query"
import { Product, CartItem } from "../../useQuery/user/auth"
import { toast } from "react-toastify"


function SupportSection () {
  const services = [
    {
      icon: "🚚", 
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      icon: "🎧", 
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      icon: "✅", 
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div className="py-10 border-b my-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center md:w-1/3 px-4">
            <div className="bg-black text-white p-4 rounded-full text-2xl mb-4">{service.icon}</div>
            <h3 className="font-bold text-lg">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}


const ProductPage = ({product}: {product: {id: number; name:string}}) => {
  
  const {data, isLoading, isError} = useProduct()

  const handleAddToCart = (product: Product) => {
    const newItem: CartItem = { product, quantity: 1 };
  
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
  
    const updatedCart = [...existingCart];
    const existingIndex = updatedCart.findIndex((item) => item.product.id === product.id);
  
    if (existingIndex >= 0) {
      updatedCart[existingIndex].quantity += 1; // Nếu có rồi thì +1
    } else {
      updatedCart.push(newItem);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  
    toast.success("🛒 Sản phẩm đã được thêm vào giỏ hàng!", { position: "top-right" });
  };
  

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex space-x-2 mb-2">
        <div className="w-3 h-7 bg-red-700 rounded-[5px]"></div>
        <p className="content-center text-xs text-red-600 font-bold">Our Product</p>
      </div>
      <h2 className="text-3xl font-bold mb-12">Explore Our Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 relative group">
            <div className="relative">
              <img src={product.images[0]} alt={product.name} className="w-fit h-48 content-center ml-8 rounded-md" />
              <button onClick={() => handleAddToCart(product)} className="absolute bottom-0 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-black text-white py-2 px-4 w-[288px] hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
            <Link to={`/productdetail/${product.id}`}>
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-red-500 font-bold">{product.price}</p>
            <p className="text-gray-500 text-sm">Stock: {product.stock}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center mt-6">
        <button className="bg-red-500 text-white py-2 px-6 rounded-full text-lg hover:bg-red-600">
          View All Products
        </button>
      </div>
      <SupportSection />
    </div>
  )
}

export default ProductPage
