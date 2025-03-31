import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MagnifyingGlassIcon, HeartIcon, ShoppingCartIcon, UserIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuthStore, useCartStore } from "../store/store"; // Zustand

const Header = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const { cartCount } = useCartStore(); // ✅ Lấy số lượng giỏ hàng từ Zustand
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-white relative">
      <div className="bg-black text-white text-center py-2 text-sm relative">
        <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! </span>
        <a href="#" className="font-bold underline">Shop Now</a>
        <div className="absolute right-4 top-1">
          <select className="bg-black text-white border-none outline-none">
            <option>English</option>
            <option>Vietnamese</option>
          </select>
        </div>
      </div>

      <div className="container border mx-auto flex justify-between items-center py-4 px-20">
        <Link to="/" className="text-2xl font-bold flex-1">
          Exclusive
        </Link>

        <nav className="flex flex-1 justify-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </nav>

        <div className="flex-1 flex justify-end items-center space-x-4 relative">
          <div className="relative">
            <input type="text" placeholder="What are you looking for?" className="border rounded-md px-4 py-2 w-64 focus:outline-none bg-gray-100" />
            <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <HeartIcon className="w-6 h-6 text-black cursor-pointer" />
          <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
            <ShoppingCartIcon className="w-6 h-6 text-black" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {isAuthenticated && (
            <div className="relative">
              <UserIcon className="w-6 h-6 text-black cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)} />
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border shadow-md rounded-md">
                  <Link to="/my-account" className="block px-4 py-2 hover:bg-gray-100" onClick={() => setIsMenuOpen(false)}>
                    My Account
                  </Link>
                  <button onClick={handleLogout} className="flex w-full px-4 py-2 text-left hover:bg-gray-100">
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
