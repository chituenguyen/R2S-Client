import React from "react";
import { FiGrid } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";


const Banner = () => {
  return (
    <div className="w-full max-w-[1920px] border-t border-gray-200 bg-white">
      {/* Header thứ hai ngay dưới Header chính */}
      <header className="w-full flex items-center justify-between px-8 py-3 border-b border-gray-300">
        {/* Browse Categories */}
        <div className="flex items-center bg-[#3BB77E] px-4 py-2 rounded-md cursor-pointer">
          <FiGrid className="text-white mr-2" />
          <span className="text-white font-bold">Browse all categories</span>
          <IoIosArrowDown className="text-white ml-2" />
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6 text-[#253D4E] font-bold">
          <a href="#" className="hover:text-[#3BB77E]">Home</a>
          <a href="#" className="hover:text-[#3BB77E]">Shop</a>
          <a href="#" className="hover:text-[#3BB77E]">Seller</a>
          <a href="#" className="hover:text-[#3BB77E] flex items-center">
            Mega Menu <IoIosArrowDown className="ml-1" />
          </a>
          <a href="#" className="hover:text-[#3BB77E] flex items-center">
            Blog <IoIosArrowDown className="ml-1" />
          </a>
          <a href="#" className="hover:text-[#3BB77E]">Contact</a>
        </nav>

        {/* Live Chat */}
        <div className="flex items-center space-x-2">
          <img src="/src/components/images/icon-headphone.jpg" alt="Support" className="w-9 h-9" />
          <div>
            <p className="text-[#3BB77E] font-bold">Live Chat</p>
            <span className="text-sm text-gray-500">24/7 Support Center</span>
          </div>
        </div>
      </header>

      {/* Banner chính */}
      <div className="w-[1288px] h-[400px] mt-[100px] mx-auto relative">
      {/* Section 1 */}
      <div className="w-[1264px] h-[650px] mx-auto rounded-[30px] bg-cover bg-center relative overflow-visible">
        {/* Background Image */}
        <img
          src="/src/components/images/tabpanel.png"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover rounded-[30px]"
        />

        {/* Subscribe Section */}
        <div className="absolute bottom-[150px] left-[75.83px] flex flex-col items-start">
          {/* Heading 1 */}
          <h1 className="text-[72px] leading-[80px] font-bold text-[#253D4E] mt-[-150px] max-w-[700px]">
            "Don't miss out on incredible grocery deals"
          </h1>

          {/* Dòng chữ "Sign up for the daily newsletter" */}
          <p className="text-[30px] leading-[40px] text-[#7E7E7E] font-[400] mt-4 mb-6">
            Sign up for the daily newsletter
          </p>

          {/* Subscribe Form */}
          <div className="w-[450px] h-[64px] flex items-center bg-white rounded-full shadow-md">
            {/* Input Field */}
            <div className="w-[292.45px] h-[64px] flex items-center px-4 rounded-l-full bg-gray-100">
              <img src="/src/components/images/email.png" alt="Envelope" className="w-5 h-5 ml-2" />
              <input
                type="email"
                placeholder="Your email address"
                className="bg-transparent text-gray-600 text-sm pl-4 outline-none flex-grow"
              />
            </div>

            {/* Subscribe Button */}
            <button className="w-[157.55px] h-[64px] bg-[#3BB77E] rounded-full text-white text-[16px] font-medium tracking-wide">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default Banner;
