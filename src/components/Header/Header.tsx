import { useState } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import Search from "../Layout/Search";

function Header() {
  const [language, setLanguage] = useState("English");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-300">
      {/* Top Banner */}
      <div className="flex bg-black text-white text-center py-3 text-sm justify-center relative">
        <div>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <span className="font-bold cursor-pointer ml-2">Shop Now</span>
        </div>
        {/* Language Dropdown */}
        <div className="absolute right-10">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1"
          >
            <span>{language}</span>
            <span>▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 bg-black text-white shadow-md mt-2 rounded w-24 z-20">
              <p
                className="p-2 cursor-pointer hover:bg-gray-700"
                onClick={() => setLanguage("English")}
              >
                English
              </p>
              <p
                className="p-2 cursor-pointer hover:bg-gray-700"
                onClick={() => setLanguage("Vietnamese")}
              >
                Vietnamese
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Navbar */}
      <div className="w-full mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link to="/" className="text-black text-2xl font-bold font-mono">
          Exclusive
        </Link>

        {/* Menu */}
        <nav>
          <ul className="hidden md:flex space-x-8 text-black font-medium">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/signup" className="hover:underline">Sign Up</Link></li>
          </ul>
        </nav>

        {/* Search & Icons */}
        <div className="flex items-center space-x-6">
          <Search />
          <Link to="/wishlist"><FaRegHeart className="transition hover:scale-110" /></Link>
          <Link to="/cart"><FiShoppingCart className="transition hover:scale-110" /></Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
