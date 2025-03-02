import { FaHeart, FaShoppingCart, FaUser, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white">
      <div className="relative flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center absolute left-[163px] top-[62px]">
          <img src="/public/logo.svg" alt="Logo" className="w-[72px] h-[55px]" />
          <span className="absolute left-[80px] top-[10px] font-quicksand font-semibold text-3xl text-[#253D4E]">Logo</span>
        </div>

        {/* Search Bar */}
        <div className="absolute left-[417px] top-[71px] w-[700px] h-[54px] flex bg-white border-2 border-[#BCE3C9] rounded-md overflow-hidden">
          <button className="bg-white text-gray-700 p-2 px-4 flex items-center gap-3 font-lato font-medium">
            All Categories             
            <img src="/public/Vector.svg" alt="Dropdown Arrow" className="w-2.5 h-2.5 pt-1" />
          </button>
          <input type="text" placeholder="Search for items..." className="flex-grow p-2 outline-none font-lato" />
          <button className="text-gray-500 p-2 px-4">
            <FaSearch className="text-lg" />
          </button>
        </div>

        {/* Location Selector */}
        <button className="absolute left-[1289px] top-[78px] w-[164px] h-[40px] flex bg-white border border-[#ECECEC] shadow-md rounded pl-1 px-3 font-quicksand" style={{ boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.05)" }}>
          <div className="text-gray-700 flex items-center">
            <img src="/public/Icon.svg" alt="Loca" className="w-9 h-9" />
            <span className="text-green-500 text-sm font-quicksand mr-2.5">Your Location</span>
            <img src="/public/Vector.svg" alt="Dropdown Arrow" className="w-2.5 h-2.5 pt-1" />
            </div>
        </button>


        {/* Wishlist, Cart, Account */}
        <div className="absolute left-[1472px] top-[85px] flex space-x-6 text-gray-700 items-center font-lato">
          <button className="flex items-center space-x-2">
            <img src="/public/Heart.svg" alt="Loca" className="w-6 h-6" />
            <span className="text-gray-500 text-sm">Wishlist</span>
          </button>
          <button className="flex items-center space-x-2">
            <img src="/public/Cart.svg" alt="Loca" className="w-6 h-6" />
            <span className="text-gray-500 text-sm">Cart</span>
          </button>
          <button className="flex items-center space-x-2">
            <img src="/public/User.svg" alt="Loca" className="w-6 h-6" />
            <span className="text-gray-500 text-sm">Account</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;