import React, { useState } from "react";
import * as product from "../api/product";
import { useQuery } from "@tanstack/react-query";
import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";
import ProductSkeleton from "../components/Skeleton/ProductSkeleton";
import { TbTruckDelivery } from "react-icons/tb";
import { RiCustomerService2Fill } from "react-icons/ri";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import ProductList from "../components/List/ProductList";

let PRODUCT_PER_PAGE = 8; // Số sản phẩm hiển thị trên mỗi trang

function HomePage() {

  const { data, isPending, error } = useQuery({
    queryKey: ["product"],
    queryFn: () => product.getProductList(),
  });
  const [currentProduct, setCurrentProduct] = useState(1);

  const startIndex = (currentProduct - 1) * PRODUCT_PER_PAGE;
  const endIndex = startIndex + PRODUCT_PER_PAGE;
  const currentProductList = data ? data.data.slice(startIndex, endIndex) : [];


  const handleShowAllProducts = () => {
    setCurrentProduct(1); // Reset về trang đầu tiên
    PRODUCT_PER_PAGE = data.data.length; // Hiển thị tất cả sản phẩm trên 1 trang
  };

  return (
    <div className="max-w-screen-xl mx-auto py-6 mt-[50px]">
      <header className="mb-10">
        <div className="flex items-center">
          <div className="bg-red-500 w-2 h-8 mr-2"></div>
          <div className="text-red-500 font-medium text-sm">Our Products</div>
        </div>
        <div className="flex items-center space-x-4 justify-between">
          <div className="text-4xl font-semibold mt-2">Explore Our Products</div>
          <div className="flex items-center space-x-2 ml-auto">
            <button className="bg-gray-100 rounded-full p-2">
              <AiFillCaretLeft className="h-5 w-5" />
            </button>
            <button className="bg-gray-100 rounded-full p-2">
              <AiFillCaretRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      <div>
        <section>
          {isPending ? (
            <ProductSkeleton />
          ) : (
            <ProductList  PRODUCT_PER_PAGE={PRODUCT_PER_PAGE}/>
          )}
        </section>

        {/* Nút "Show All Products" */}
        {currentProductList.length < data?.data.length && (
          <div className="col-span-full text-center mt-4 ">
            <div className="border-t border-gray-300 w-full mt-4"></div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-10  rounded "
              onClick={handleShowAllProducts}
            >
              View All Products
            </button>
          </div>
        )}
      </div>
      <div className="bg-white py-12 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free and Fast Delivery */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-full p-4 inline-flex items-center justify-center mb-4">
                <div className="bg-black rounded-full p-4 inline-flex items-center justify-center ">
                  <TbTruckDelivery className="text-white w-[32px] h-[32px]" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">FREE AND FAST DELIVERY</h3>
              <p className="text-gray-600">Free delivery for all orders over $140</p>
            </div>

            {/* 24/7 Customer Service */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-full p-4 inline-flex items-center justify-center mb-4">
                <div className="bg-black rounded-full p-4 inline-flex items-center justify-center ">
                  <RiCustomerService2Fill className="text-white w-[32px] h-[32px]" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 CUSTOMER SERVICE</h3>
              <p className="text-gray-600">Friendly 24/7 customer support</p>
            </div>

            {/* Money Back Guarantee */}
            <div className="text-center">
              <div className="bg-gray-200 rounded-full p-4 inline-flex items-center justify-center mb-4">
                <div className="bg-black rounded-full p-4 inline-flex items-center justify-center ">
                  <IoShieldCheckmarkOutline className="text-white w-[32px] h-[32px]" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">MONEY BACK GUARANTEE</h3>
              <p className="text-gray-600">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-300 w-full"></div>
    </div>
  );
}

export default HomePage;
