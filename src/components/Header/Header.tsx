import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { FaRegHeart } from "react-icons/fa"
import { FiShoppingCart } from "react-icons/fi"
import { HiOutlineMenu, HiX } from "react-icons/hi" // Hamburger Icon
import Search from "../Layout/Search"
import { FaUser } from "react-icons/fa"

const Header: React.FC = () => {
  const [cartCount, setCartCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState<string | null>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const avatarRef = useRef<HTMLDivElement>(null)
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  )
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    const storedUsername = localStorage.getItem("username") // Lấy tên từ localStorage
    setIsLoggedIn(loggedIn)
    setUsername(storedUsername)

    // Lấy giỏ hàng từ localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]")
    setCartCount(storedCart.length)
  }, [])

  useEffect(() => {
    function updateCartCount() {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(storedCart.length);
    }
  
    updateCartCount(); // Cập nhật ngay khi component mount
    window.addEventListener("storage", updateCartCount);
  
    return () => window.removeEventListener("storage", updateCartCount);
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const changeLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
    setDropdownOpen(false) // Đóng dropdown sau khi chọn
  }

  return (
    <header className="w-full bg-white border-b border-gray-300">
      {/* Top Banner */}
      <div className="flex bg-black text-white text-center py-3 text-sm justify-center relative">
        <div>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <span className="font-bold cursor-pointer ml-2">Shop Now</span>
        </div>

        {/* Language Dropdown */}
        <div className="absolute right-10" ref={dropdownRef}>
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
                onClick={() => changeLanguage("English")}
              >
                English
              </p>
              <p
                className="p-2 cursor-pointer hover:bg-gray-700"
                onClick={() => changeLanguage("Vietnamese")}
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

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <HiX size={28} /> : <HiOutlineMenu size={28} />}
        </button>

        {/* Menu */}
        <nav
          className={`absolute md:relative bg-white md:bg-transparent w-full md:w-auto md:flex space-x-8 text-black font-medium transition-all ${
            menuOpen
              ? "top-16 left-0 shadow-md p-4 md:p-0 flex flex-col items-center"
              : "hidden md:flex"
          }`}
        >
          <Link
            to="/"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          {!isLoggedIn && (
            <Link
              to="/signup"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          )}
          {isLoggedIn && (
            <Link
              to="/profile"
              className="hover:underline"
              onClick={() => setMenuOpen(false)}
            >
              Account
            </Link>
          )}
        </nav>

        {/* Search & Icons */}
        <div className="flex items-center space-x-6">
          <Search />
          <Link to="/wishlist">
            <FaRegHeart className="transition hover:scale-110" />
          </Link>
          <Link to="/cart" className="relative">
            <FiShoppingCart className="transition hover:scale-110 w-8 h-8" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <div
            className="relative"
            ref={avatarRef}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Link to={isLoggedIn ? "/profile" : "/signin"}>
              <FaUser className="w-8 h-8 cursor-pointer transition hover:scale-110" />
            </Link>
            {isLoggedIn && showTooltip && username && (
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-lg whitespace-nowrap">
                {username}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
