import { useQuery } from "@tanstack/react-query";
import { CiHeart } from "react-icons/ci";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Header from "../components/Header/Header";
import Footer from "../components/Layout/Footer";
import * as product from "../redux/api/axios";
import { useState } from "react";
const PRODUCT_PER_PAGE = 8; // Số sản phẩm hiển thị trên mỗi trang

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  category: string
  brand: string
  stock: number
}

function SupportSection () {
  const services = [
    {
      src: 'src/images/fast-delivery-icon-free-vector.jpg', // Biểu tượng vận chuyển
      title: "FREE AND FAST DELIVERY",
      description: "Free delivery for all orders over $140",
    },
    {
      src: 'src/images/customer service.png', // Biểu tượng hỗ trợ
      title: "24/7 CUSTOMER SERVICE",
      description: "Friendly 24/7 customer support",
    },
    {
      src: "src/images/png-clipart-money-back-guarantee-computer-icons-search-button-miscellaneous-service.png", // Biểu tượng bảo đảm
      title: "MONEY BACK GUARANTEE",
      description: "We return money within 30 days",
    },
  ];

  return (
    <div className="py-10 border-b my-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {services.map((service, index) => (
          <div key={index} className="flex flex-col items-center md:w-1/3 px-4">
            <img src={service.src} alt={service.title} className="w-16 h-16 mb-4" />
            <h3 className="font-bold text-lg">{service.title}</h3>
            <p className="text-gray-600 text-sm">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const { data, isPending, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => product.getProductList(),
  });

  const currentProductList = data?.data ? data.data.slice(0, PRODUCT_PER_PAGE) : [];

  const Skeleton = () => (
    <div className="animate-pulse">
      {[1, 2, 3, 4, 5].map((index) => (
        <div key={index} className="mb-4 p-4 border rounded-lg bg-white">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div className="max-w-screen-xl mx-auto py-6">
      <header className="mb-10">
        <div className="flex items-center">
          <div className="bg-red-500 w-2 h-8 mr-2"></div>
          <div className="text-red-500 font-medium text-sm">Our Products</div>
        </div>
        <div className="text-4xl font-semibold mt-2">Explore Our Products</div>
      </header>

      {/* Posts Section */}
      <section>
  {isPending ? (
    <Skeleton />
  ) : (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProductList.length === 0 ? (
          <p className="text-gray-600">Không có sản phẩm nào.</p>
        ) : (
          currentProductList.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="bg-gray-100 p-4 relative">
                <div className="p-10 flex justify-center items-center">
                  <img
                    src={"https://via.placeholder.com/150"}
                    alt={product.name}
                    className="h-[180px] w-[115px] object-contain"
                  />
                </div>
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <CiHeart className="h-6 w-6 text-gray-600" />
                  <MdOutlineRemoveRedEye className="h-6 w-6 text-gray-600" />
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="text-red-500 font-bold">${product.price}</div>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )}
</section>
      <div className="text-center mt-6">
        <button className="bg-red-500 text-white py-2 px-6 rounded-full text-lg hover:bg-red-600">
          View All Products
        </button>
      </div>
      <SupportSection />
      </div>
    </div>
  );
}

export default HomePage;