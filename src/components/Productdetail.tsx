import React, { useState } from "react"
import detail3 from "../../assets/detail3.jpg"
import ship from "../../assets/ship1.jpg"
import refesh from "../../assets/refesh.jpg"
import heart from "../../assets/heart.png"
import visible from "../../assets/visible.png"
import { Link, useParams } from "react-router-dom"
import { useProducts } from "../redux/slices/productSlice"
import Navbarpage from "../pages/Navbarpage"
import ChatPage from "../pages/ChatPage"



const ProductDetail = () => {
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const handleBuyNow = () => {
    if (!product) {
      alert("Product not available");
      return;
    }
  
    const orderData = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      quantity: quantity,
      totalPrice: product.price * quantity,
    };
  
    // Lưu đơn hàng vào localStorage
    let orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));
  
    // Chuyển hướng tới trang giỏ hàng hoặc thông báo
    alert("Product added to cart!");
  };
  // Lấy id từ URL
  const { id } = useParams()
  console.log(id)
  
  const { data, isLoading, error } = useProducts()
  if (isLoading)
    return <div className="text-center py-10">Loading products...</div>
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products: {error.message}
      </div>
    )
  if (!data?.data?.length) {
    return <div className="text-center py-10">No products available</div>
  }
  const sortedData = data.data.slice(0, 4).sort((a, b) => a.id - b.id);

  // Tìm sản phẩm theo id từ data
  const product = data.data.find((item) => item.id.toString() === id)
  if (!product) {
    return <div className="text-center py-10">Product not found</div>
  }

  const increaseQuantity = () => setQuantity(quantity + 1)
  const decreaseQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1)
  console.log(product)

  return (
    <div className="w-full mx-auto mt-10">
      <Link to="/home">
        <Navbarpage />
      </Link>
        <ChatPage />
      {/* Thanh phân cách */}
      <div className="w-full h-[1px] mt-5 border-t border-gray-300 opacity-30 mx-auto"></div>
       
      <div className="flex gap-20 justify-center mt-24">
        <div className="h-[600px]">          
            <div className="w-[170px] h-[138px]  rounded-sm bg-[#F5F5F5]">
              <img
                className="w-[121px] h-[114px] object-cover mx-auto"
              src={product.images?.[0] }
              alt=""
            />
          </div>
          <div className="w-[170px] h-[138px]  rounded-sm my-4 bg-[#F5F5F5]">
            <img
              className="w-[112px] h-[97px] object-cover  mx-auto"
              src={product.images?.[0] }
              alt=""
            />
          </div>
          <div className="w-[170px] h-[138px] rounded-sm my-4 bg-[#F5F5F5]">
            <img
              className="w-[134px] h-[94px] object-cover mx-auto"
              src={product.images?.[0] }
              alt=""
            />
          </div>
          <div className="w-[170px] h-[138px]  rounded-sm bg-[#F5F5F5]">
            <img
              className="w-[122px] h-[106px] object-cover mx-auto"
              src={product.images?.[0] }
              alt=""
            />
          </div>
        </div>


        <div className="w-[500px] h-[600px] rounded-lg bg-[#F5F5F5]">
          <div className="mt-20">
            <img
              className="w-[446px] h-[315px] object-cover mx-auto"
              src={product.images?.[0] }
              alt=""
            />
          </div>
        </div>
        <div>
          <div className="h-[600px] space-y-6">
            
            <h1 className="text-[24px] leading-[24px] text-bold font-poppins">
              {product.name}
            </h1>
            <div className="flex items-center gap-2">
              <div className="text-yellow-400 text-2xl rounded-[1.4px] mt-[-9px]">
                ★★★★☆
              </div>
              <p className="text-black-400 text-[14px] leading-[21px] font-poppins opacity-50 my-auto">
                ({product.stock} Reviews)
              </p>
              <p className="border-1 opacity-[50%] mt-[-10px] ">|</p>
              <p className="text-400 text-[#00FF66] text-[14px] leading-[21px] font-poppins opacity-60">
                In Stock
              </p>
            </div>
            <h2 className="text-[24px] leading-[24px] text-bold font-poppins">
              {product.price}$
            </h2>
            <p className="w-[373px] text-[14px] text-black-400 leading-[21px] font-poppins">
              {product.description}
            </p>


            
            <div className="w-[400px] h-[1px] bg-[#000000] border-[1px]"></div>
            <div className="flex items-center gap-2">
              <h3 className="text-[20px] leading-[20px] text-sm font-poppins">
                Colours:
              </h3>
              <div className="w-[20px] h-[20px] bg-[#A0BCE0] rounded-full border-[#000000] border-[3px] cursor-pointer"></div>
              <div className="w-[20px] h-[20px] bg-[#E07575] rounded-full border-[#000000] border-[3px] cursor-pointer"></div>
            </div>
            <div className="flex items-center gap-5">
              <span className="font-poppins text-[20px] leading-[20px] text-medium text-gray-800">
                Size :
              </span>

              <button
                className={`w-[35px] h-[35px] border-[3px] text-black-500 font-poppins rounded-[5px] ${
                  selectedSize === "XS"
                    ? "bg-red-500 text-white"
                    : "text-gray-700"
                } hover:bg-red-600 hover:text-white transition duration-300`}
                onClick={() => setSelectedSize("XS")}
              >
                XS
              </button>

              <button
                className={`w-[35px] h-[35px] border-[3px] text-black-500 font-poppins rounded-[5px]  ${
                  selectedSize === "S"
                    ? "bg-red-500 text-white"
                    : "text-gray-700"
                } hover:bg-red-600 hover:text-white transition duration-300`}
                onClick={() => setSelectedSize("S")}
              >
                S
              </button>

              <button
                className={`w-[35px] h-[35px] border-[3px] text-black-500 font-poppins rounded-[5px]  ${
                  selectedSize === "M"
                    ? "bg-red-500 text-white"
                    : "text-gray-700"
                } hover:bg-red-600 hover:text-white transition duration-300`}
                onClick={() => setSelectedSize("M")}
              >
                M
              </button>

              <button
                className={`w-[35px] h-[35px] border-[3px] text-black-500 font-poppins rounded-[5px]  ${
                  selectedSize === "L"
                    ? "bg-red-500 text-white"
                    : "text-gray-700"
                } hover:bg-red-600 hover:text-white transition duration-300`}
                onClick={() => setSelectedSize("L")}
              >
                L
              </button>

              <button
                className={`w-[35px] h-[35px] border-[3px] text-black-500 font-poppins rounded-[5px]  ${
                  selectedSize === "XL"
                    ? "bg-red-500 text-white"
                    : "text-gray-700"
                } hover:bg-red-600 hover:text-white transition duration-300`}
                onClick={() => setSelectedSize("XL")}
              >
                XL
              </button>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 rounded-md">
                <button
                  className="w-[40px] h-[44px] border-[2px] bg-white text-3xl items-center "
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="w-[80px] h-[44px] border-[2px] flex items-center justify-center text-xl">
                  {quantity}
                </span>
                <button
                  className="w-[40px] h-[44px] border-[2px] bg-[#DB4444] text-white text-3xl"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>

              {/* Buy Now Button */}
              <button className="px-6 py-2 w-[165px] h-[44px] bg-red-500 text-white font-poppins rounded-md hover:bg-red-600 transition-colors" onClick={handleBuyNow}>
                Buy Now
              </button>

              {/* Add to Wishlist (Heart Icon) */}
              <button className="w-[40px] h-[40px] border-2 rounded-full flex items-center justify-center border-gray-300 transition-colors hover:bg-red-500 hover:text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-700 hover:bg-red-500 hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                  />
                </svg>
              </button>
            </div>
            <div className="w-[399px] h-[170px] bg-[#00000080 50%] border-[2px] rounded-[4px] ">
              <div className="w-[332px] h-[50px] gap-4 mx-auto flex items-center mt-[24px] ml-[16px]">
                <div className="w-[40px] h-[40px] ">
                  <img src={ship} alt="" />
                </div>
                <div className="w-[276px] h-[50px] gap-2">
                  <p className="text-[16px] leading-[24px] text-black-500 font-poppins">
                    Free Delivery
                  </p>
                  <p className="text-[12px] leading-[18px] text-black-500 font-poppins">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>
              <div className="w-[398px] h-[1px] border-[1px]"></div>

              <div className="w-[281px] h-[50px] gap-4 mx-auto flex items-center mt-[26px] ml-[16px]">
                <div className="w-[40px] h-[40px] ">
                  <img src={refesh} alt="" />
                </div>
                <div className="w-[225px] h-[50px] gap-2">
                  <p className="text-[16px] leading-[24px] text-black-500 font-poppins">
                    Return Delivery
                  </p>
                  <p className="text-[12px] leading-[18px] text-black-500 font-poppins">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] w-full h-[450px] gap-[60px] mt-[150px] mx-auto">
        <div className="ml-[34px] w-[180px] h-[40px] flex">
          <div className="w-[25px] h-[40px] bg-[#DB4444] rounded-[7px] border-[1px]"></div>
          <div className="w-[180px] h-[40px] ">
            <p className="text-[20px] leading-[20px] text-[#DB4444] mt-[9px] ml-[8px] text-center font-poppins">
              Related Item
            </p>
          </div>
        </div>
        {/* Product Section */}
        <div className="max-w-[1440px] w-full h-[732px] mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedData.map((product) => (
            <div
              key={product.id}
              className="w-[270px] h-[322px] gap-16 mx-auto"
            >
              <div className="w-[270px] h-[250px] border rounded-[4px] bg-[#F5F5F5] relative">
                <div className="w-[190px] h-[180px] mt-[35px] ml-[40px]">
                  <img
                    className="w-[120px] h-[180px] mx-auto cursor-pointer"
                    src={product.images?.[0] || detail3}
                    alt="Product"
                  />
                </div>
                {/* Add Like and View icons */}
                <div className="w-[34px] h-[76px] mt-[12px] gap-2 absolute top-[-5px] right-[10px] flex flex-col items-center">
                  {/* Heart Icon */}
                  <span className="w-[34px] h-[34px] flex items-center justify-center  rounded-full bg-[#FFFFFF]">
                    <img
                      className="w-[16px] h-[14px] object-cover cursor-pointer"
                      src={heart}
                      alt="Heart"
                    />
                  </span>
                  {/* Eye Icon */}
                  <span className="w-[34px] h-[34px] flex items-center justify-center rounded-full bg-[#FFFFFF]">
                    <img
                      className="w-[16px] h-[14px] object-cover cursor-pointer"
                      src={visible}
                      alt="Visible"
                    />
                  </span>
                </div>
              </div>
              <div className="w-[270px] h-[56px] gap-6 items-center">
                <div className="w-[270px] h-[24px] mt-5 my-1">
                  <p className="text-[16px] font-medium leading-[24px]">
                    {product.name}
                  </p>
                </div>
                <div className="w-[185px] h-[24px] gap-2 items-center">
                  <p className="text-[16px] font-medium leading-[24px] text-[#DB4444]">
                    {product.price}
                  </p>
                  <div className="items-center">
                    <span className="text-yellow-500 text-2xl rounded-[1.4px]">
                        ★★★★☆
                    </span>
                    <span className="text-gray-500 mx-2 items-center">
                      {" "}
                      ({product.stock})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Repeat this for more products */}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
