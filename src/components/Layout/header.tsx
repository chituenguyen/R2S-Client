import { Link } from "react-router-dom"
import Search from "./Search";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosArrowDown } from "react-icons/io";

function Header() {
    return(
      <div className="container">
        <div className="bg-gradient-to-r from-black to-black text-white py-2 px-6 flex items-center justify-between">
        {/* Nội dung bên trái */}
          <div className="flex items-center justify-center flex-1">
            <span className="text-sm">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
            </span>
            <Link to="/" className="text-white px-2 py-2 rounded-md ml-2 text-sm font-semibold underline">
              ShopNow
            </Link>
          </div>

        {/* Nội dung bên phải */}
          <div className="flex items-center mr-[100px]">
            <span className="text-sm mr-2">English</span>
            <IoIosArrowDown/>
          </div>
        </div>
        <header className="w-full h-28 bg-white ring shadow-xl ring-gray-900/5">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-full ">
        <div className="flex justify-around items-center space-x-6">
          <Link to="/" className="text-black h-[24px] w-[118px] font-bold text-2xl font-mono ">
            Exclusive
          </Link>
        </div>
        <nav>
          <ul className="flex justify-around items-center space-x-8 text-black text-2xl">
            <li>
            <Link
                to="/"
                className="text-decoration-none hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
            <Link
                to="/"
                className="text-decoration-none hover:underline"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-decoration-none hover:underline"
              >
               About
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="text-decoration-none hover:underline"
              >
               Sign Up
              </Link>
            </li>
           </ul>
        </nav>
        
        <nav>
          <ul className="flex justify-around items-center space-x-8 text-black text-2xl">
            <li className="">
            <Search/>
            </li>
            <li>
              <FaRegHeart className="transition hover:scale-110"/>
            </li>
            <li>
              <FiShoppingCart className="transition hover:scale-110"/>
            </li>
          </ul>
        </nav>
        </div>
        </header>
        </div>
    )
}

export default Header;