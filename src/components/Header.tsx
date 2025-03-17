import { Link } from "react-router-dom";
import { MagnifyingGlassIcon, HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="bg-black text-white text-center py-2 text-sm relative">
        <span>Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! </span>
        <a href="#" className="font-bold underline">ShopNow</a>
        <div className="absolute right-4 top-1">
          <select className="bg-black text-white border-none outline-none">
            <option>English</option>
            <option>Vietnamese</option>
          </select>
        </div>
      </div>

      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link to="/" className="text-2xl font-bold flex-1">
          Exclusive
        </Link>

        <nav className="flex flex-1 justify-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/contact" className="hover:underline">Contact</Link>
          <Link to="/about" className="hover:underline">About</Link>
          <Link to="/signup" className="hover:underline">Sign Up</Link>
        </nav>

        <div className="flex-1 flex justify-end items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="border rounded-md px-4 py-2 w-64 focus:outline-none bg-gray-100"
            />
            <MagnifyingGlassIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <HeartIcon className="w-6 h-6 text-black cursor-pointer" />
          <ShoppingCartIcon className="w-6 h-6 text-black cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
