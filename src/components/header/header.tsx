import { useState } from "react"
import { Link } from "react-router-dom"

function Search() {
  return (
    <div className="flex items-center space-x-4 mr-20">
      <div className="relative hidden md:block">
        <input
          type="text"
          placeholder="What are you looking for?"
          className="border px-4 py-2 text-sm w-60"
        />
        <span className="absolute cursor-pointer right-3 top-2 text-gray-500">
          🔍
        </span>
      </div>
      <Link>❤️</Link>
      <Link>🛒</Link>
    </div>
  )
}

function Menu() {
  return (
    <ul className="hidden md:flex space-x-6 text-gray-600 font-medium">
      <li className=" border-black">
        <Link to="/">Home</Link>
      </li>
      <li className="cursor-pointer">
        <Link to="/contact">Contact</Link>
      </li>
      <li className="cursor-pointer">
        <Link to="/about">About</Link>
      </li>
      <li className="cursor-pointer">
        <Link to="/signin">Sign in</Link>
      </li>
    </ul>
  )
}

const Header = () => {
  const [language, setLanguage] = useState("English")
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <header>
      {/* Top Banner */}
      <div className="flex bg-black text-white text-center py-4 text-sm justify-center">
        <div className="">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
          <span className="font-bold cursor-pointer ml-2">ShopNow</span>
        </div>
        <div className="absolute right-36">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-1"
          >
            <span>{language}</span>
            <span>▼</span>
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 bg-black shadow-md mt-2 rounded w-24 z-20">
              <p
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => setLanguage("English")}
              >
                English
              </p>
              <p
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => setLanguage("Vietnamese")}
              >
                Vietnamese
              </p>
            </div>
          )}
        </div>
      </div>
      <div>
        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
          {/* Logo */}
          <h1 className="text-2xl font-bold ml-16">Exclusive</h1>

          {/* Menu */}
          <Menu />

          {/* Search & Icons */}
          <Search />
        </nav>
      </div>
    </header>
  )
}

export default Header
