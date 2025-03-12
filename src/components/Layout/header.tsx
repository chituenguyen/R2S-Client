
import { Link } from "react-router-dom"
import Search from "./Search";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from 'react-icons/fi';

function Header() {
    return(
        <header className=" container w-full h-28 bg-white ring shadow-xl ring-gray-900/5 ">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-full">
        <div className="flex justify-around items-center space-x-6">
          <Link to="/" className="text-black h-[24px] w-[118px] font-bold text-2xl font-mono">
            Exclusive
          </Link>
        </div>
        <nav>
          <ul className="flex justify-around items-center space-x-8 text-black text-2xl ">
            <li>
            <Link
                to="/"
                className=" text-decoration-none hover:underline"
              >
                Home
              </Link>
            </li>
            <li>
            <Link
                to="/"
                className=" text-decoration-none hover:underline"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className= "text-decoration-none hover:underline"
              >
               About
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className=" text-decoration-none hover:underline"
              >
               Sign Up
              </Link>
            </li>
           </ul>
        </nav>
        
        <nav>
          <ul className="flex justify-around items-center space-x-8 text-black text-2xl ">
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
    )
}

export default Header;