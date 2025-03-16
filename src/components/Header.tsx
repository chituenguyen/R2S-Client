import React, { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    
    // Lấy giỏ hàng từ localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartCount(storedCart.length);
  }, []);

  return (
    <header className="w-full border-b absolute top-0 left-0">
      {/* Banner khuyến mãi */}
      <div className="bg-black text-white flex justify-between items-center w-full py-2 text-sm h-12 px-60">
        {/* Văn bản khuyến mãi */}
        <span className="font-[Poppins] text-[14px] flex-1 text-center text-gray-300">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <a href="#" className="font-semibold hover:border-b-2 hover:border-white">ShopNow</a>
        </span>

        {/* Chọn ngôn ngữ */}
        <div className="flex items-center gap-3 cursor-pointer text-gray-300">
          <span>English</span>
          <img src="/DropDown.svg" alt="Search" className="w-3.5 h-3.5 cursor-pointer" />
        </div>
      </div>

      {/* Thanh điều hướng */}
      <nav className="flex items-center justify-between max-w-7xl mx-auto p-4">
        <h1 className="text-[24px] font-bold">Exclusive</h1>

        {/* Danh mục menu */}
        <div className="flex space-x-12 text-[16px]">
          <a href="/" className="hover:border-b-2 hover:border-black">Home</a>
          <a href="#" className="hover:border-b-2 hover:border-black">Contact</a>
          <a href="#" className="hover:border-b-2 hover:border-black">About</a>
          {!isLoggedIn && (
            <a href="/signup" className="hover:border-b-2 hover:border-black">Sign Up</a>
          )}
          {isLoggedIn && (
            <a href="/profile" className="hover:border-b-2 hover:border-black">Account</a>
          )}
        </div>

        <div className="flex items-center space-x-12 mr-10">

        {/* Ô tìm kiếm */}
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg text-[12px] w-[243px] h-[38px]">
            <input
            type="text"
            placeholder="What are you looking for?"
            className="bg-transparent outline-none cursor-pointer text-[12px] flex-1"
            aria-label="Search"
            />
            <img src="/SearchIcon.svg" alt="Search" className="w-4 h-4 cursor-pointer" />
        </div>

        {/* Biểu tượng giỏ hàng và yêu thích */}
        <div className="flex items-center space-x-4 relative">
            <img src="/Wishlist.svg" alt="Favorite" className="w-[32px] h-[32px] cursor-pointer" tabIndex={0}/>
            <a href="/cart" className="relative">
              <img src="/Cart1.svg" alt="Cart" className="w-[32px] h-[32px] cursor-pointer" tabIndex={0} />
              {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
              )}
            </a>
            <a href={isLoggedIn ? "/profile" : "/login"} className="relative">
              {isLoggedIn ? (
                <img src="/userlogged.svg" alt="User Logged In" className="w-[32px] h-[32px] cursor-pointer" />
              ) : (
                <img src="/user.svg" alt="User" className="w-[32px] h-[32px] cursor-pointer" />
              )}
            </a>
        </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
