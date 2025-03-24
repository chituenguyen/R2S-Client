import { Link, useLocation, useNavigate  } from "react-router-dom"
import Search from "./Search";
import { FaRegHeart } from "react-icons/fa";
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosArrowDown } from "react-icons/io";
import { jwtDecode } from "jwt-decode";
import { useEffect,useState, useCallback, use } from "react";
import { CiUser,CiLogout  } from "react-icons/ci";
import { MdLocalMall,MdCancel, MdOutlineReviews  } from "react-icons/md";
import * as user from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../context/ToastContext";
import { set } from "react-hook-form";


function Header() {
  const location = useLocation();
  const isMyProfilePage = location.pathname === '/my-profile';
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

  const handleDecoded = useCallback(() => {
    let access_token = localStorage.getItem("access_token");
    let user = {};
    if (access_token) {
      access_token = JSON.parse(access_token);
      user = jwtDecode(access_token as string);
    }
    return user;
  }, []);

  const [hasAccessToken, setHasAccessToken] = useState(false);
  const NoneAccessToken = !hasAccessToken;
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token');
    setHasAccessToken(!accessToken); // Chuyển đổi giá trị thành boolean
  }, [localStorage.getItem('access_token')]);

  const mutation = useMutation({
    mutationKey: ['logout'],
    mutationFn: (Token : string) => user.LogOut(Token),
    onSuccess: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      toast("Đăng xuất thành công")
      navigate('/'); 
    },
    onError: (error: any) => {
      if (error?.response?.status === 401) {
        console.error('Logout failed: Unauthorized. Redirecting to login.');
        navigate('/');
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        toast("Đăng xuất thành công")

      } else {
        console.error('Logout failed', error);
      }
    },
  });
  // const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  
  // useEffect(() => {
  //   const storedCartItems = JSON.parse(localStorage.getItem("cart") || "[]");
  //   setCartItems(storedCartItems);
  //   if (storedCartItems.length >= 0) {
      
  //   }
  //   }, [cartItems]);
  const cartData = JSON.parse(localStorage.getItem('cart') || '[]');
  setCartItemCount(cartData.length);

 


  

  const handleLogout = () => {
    const accessToken = localStorage.getItem("access_token");
    
    if (accessToken) {
        // logout(accessToken);
        mutation.mutate(accessToken)
    } else {
        console.error("No access token found for logout.");
    }
  };[localStorage.getItem('access_token')]

    return(
      <div className="container mx-auto max-w-full">
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
            {NoneAccessToken && <Link
                to="/signup"
                className="text-decoration-none hover:underline"
              >
               Sign Up
              </Link>}
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
              <Link to="/orders" className="relative"><FiShoppingCart className="transition hover:scale-110"/> 
              {cartItemCount > 0 && (
                <span className="absolute -top-3 -right-3  bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {cartItemCount}
                </span>
                )}
              </Link>
            </li>
            <li className=" relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
              {hasAccessToken && <Link to="/my-profile"> <CiUser tabIndex={0}
                                          role="button" 
                                          style={{ fontSize: '2.5rem', color: isMyProfilePage ? 'white' : 'black', }}
                                          className={`transition hover:scale-110 text-xl font-bold ${
                                            isMyProfilePage ? 'bg-orange-500 rounded-full p-2 ' : 'bg-white rounded-full p-2'
                                          }`}/> </Link>}
              {isHovered && ( // Hiển thị dropdown khi isHovered là true
                  <ul
                      tabIndex={0}
                      className="absolute bg-gray-500 rounded-box z-[1] w-[200px] p-3 shadow grid grid-cols-1" // Tăng width cho phù hợp
                  >
                    <li key="my-profile" className="text-decoration-none text-white text-sm flex items-center  mb-3">
                      <Link to="/my-profile" className="flex items-center"><CiUser className="mx-4 text-white"/> Manage My Account </Link>
                    </li>
                    <li key="my-order" className="text-decoration-none text-white text-sm flex mb-3">
                      <MdLocalMall className="mx-4 text-white"/>My Order
                    </li>
                    <li className="text-decoration-none text-white text-sm flex  mb-3">
                      <MdCancel className="mx-4 text-white"/>My Cancellations
                    </li>
                    <li className="text-decoration-none text-white text-sm flex  mb-3">
                      <MdOutlineReviews className="mx-4 text-white"/>My Reviews
                    </li>
                    <li className="text-decoration-none text-white text-sm flex  mb-3">
                      <button className="flex" onClick={handleLogout}><CiLogout className="mx-4 text-white"/>Logout</button>
                    </li>
                  </ul>
                )}
            </li>
          </ul>
        </nav>
        
        </div>
        </header>
        </div>
    )
}

export default Header;

function setCartItemCount(length: any) {
  throw new Error("Function not implemented.");
}
