import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import header1 from "../../assets/header1.jpg"
import myorder from "../../assets/checkout.png"

// Interface for order item
interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  image?: string;
}
// Hàm để lấy thông tin người dùng từ localStorage
const fetchUser = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  return user;  
};

// Hàm xử lý đăng xuất - trả về Promise để phù hợp với useMutation
const logoutUser = () => {
  localStorage.removeItem("user");
  return Promise.resolve(); // Trả về một Promise đã resolved
};

// Function to get cart quantity from localStorage
const getCartQuantity = (): number => {
  const existingOrders: OrderItem[] = JSON.parse(localStorage.getItem("orders") || "[]");
  return existingOrders.reduce((acc: number, item: OrderItem) => acc + item.quantity, 0);
};
function Navbarpage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [localCartQuantity, setLocalCartQuantity] = useState<number>(getCartQuantity());


  // Sử dụng useQuery để lấy thông tin người dùng từ localStorage
  const {
    data: user,
    isLoading,
    isError,
    refetch
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: true,  
  });

  const { mutate: logout } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logoutUser,
    onSuccess: () => {
      refetch();
      navigate("/login");
    },
  });

  // Gọi refetch để lấy thông tin người dùng khi component được tải lại
  useEffect(() => {
    if (user) {
      refetch();
    }
  }, [user, refetch]);

  const { data: cartQuantity } = useQuery({
    queryKey: ["cartQuantity"],
    queryFn: getCartQuantity,
    refetchOnWindowFocus: true,
    refetchInterval: 1000, 
  });
  // Thiết lập sự kiện lắng nghe localStorage thay đổi để cập nhật giỏ hàng
  useEffect(() => {
    // Cập nhật state local khi cartQuantity thay đổi
    if (cartQuantity !== undefined) {
      setLocalCartQuantity(cartQuantity);
    }

    // Hàm xử lý khi localStorage thay đổi
    const handleStorageChange = () => {
      const newQuantity = getCartQuantity();
      setLocalCartQuantity(newQuantity);
      queryClient.invalidateQueries({ queryKey: ["cartQuantity"] });
    };

    // Lắng nghe sự kiện storage
    window.addEventListener("storage", handleStorageChange);

    // Tạo hàm lắng nghe tùy chỉnh cho localStorage thay đổi trong cùng tab
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
      const event = new Event("localStorageChange");
      document.dispatchEvent(event);
      originalSetItem.apply(this, [key, value]);
    };

    const handleLocalChange = () => {
      if (localStorage.getItem("orders")) {
        const newQuantity = getCartQuantity();
        setLocalCartQuantity(newQuantity);
        queryClient.invalidateQueries({ queryKey: ["cartQuantity"] });
      }
    };

    document.addEventListener("localStorageChange", handleLocalChange);

    // Cleanup function
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      document.removeEventListener("localStorageChange", handleLocalChange);
      localStorage.setItem = originalSetItem;
    };
  }, [cartQuantity, queryClient]);

  // Hàm xử lý khi click vào icon giỏ hàng
  const handleCartClick = (e: React.MouseEvent) => {
    // Nếu bạn muốn cập nhật ngay tại trang thay vì chuyển hướng,
    // bạn có thể ngăn chặn hành vi mặc định và thực hiện cập nhật
    // e.preventDefault();
    
    // Cập nhật giỏ hàng tại chỗ
    queryClient.invalidateQueries({ queryKey: ["cartQuantity"] });
    
    // Sau đó, nếu vẫn muốn chuyển hướng đến trang giỏ hàng:
    // navigate("/cart");
  };

  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: User not found</div>
  return (
    <div className=" mx-auto">
      {/* Navbar */}
      <nav className="max-w-[1440px] w-full mx-auto bg-white py-4 px-6 flex justify-between items-center text-sm">
        <div className="text-2xl font-bold tracking-wider font-inter">
          Exclusive
        </div>
        <ul className="flex gap-12">
          <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">
            <Link to="/home">Home</Link>
          </li>
          <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">
            <Link to="/about">About</Link>
          </li>
          <li className="cursor-pointer text-[16px] text-[#000000] font-poppins tracking-normal text-center">
            <Link to="/sign-up">Sign Up</Link>
          </li>
        </ul>
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="bg-[#F5F5F5] h-[38px] w-[243px] px-3 py-2 flex items-center space-x-2">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100 outline-none text-sm w-48"
            />
            <svg
              className="w-[24px] h-[24px] cursor-pointer text-[#000000]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          {/* Icons */}
          <svg
            className="w-5 h-5 cursor-pointer text-[#000000]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.68l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <div className="relative">
          <Link to="/cart">
            <svg
              className="w-5 h-5 cursor-pointer text-[#000000]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h9a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
             {/* Display cart quantity */}
            {cartQuantity != null && cartQuantity > 0 && (
              <span className="absolute left-3 top-[-8px] bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                {cartQuantity}
              </span>
            )}
          </Link>
          </div>


          <div className="relative group">
            {/* Hình ảnh kích hoạt dropdown */}
            <img
              src={header1}
              alt="logout"
              className="w-6 h-6 cursor-pointer"
            />
            {/* cái cầu bắt */}
            <div className="w-[100px] h-[40px] absolute"></div>

            {/* Dropdown Menu */}
            <div className="absolute left-[-2px] mt-2 bg-[#F5F5F5] backdrop-blur-[150px] rounded-lg shadow-lg w-[224px] h-[208px] z-50 hidden group-hover:block">
              {/* Manage My Account Section */}
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[24px] h-[24px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 14c2.213 0 4-1.79 4-4s-1.787-4-4-4-4 1.79-4 4 1.787 4 4 4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 19v-2a5 5 0 00-5-5h-4a5 5 0 00-5 5v2"
                  />
                </svg>
                <span className="text-[14px] text-sm">Manage My Account</span>
              </div>

              {/* My Order Section */}
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 p-2 rounded-lg">
                <img src={myorder} alt="" className=" w-[24px] h-[24px]" />
                <span className="text-[14px] text-sm">My Order</span>
              </div>

              {/* My Cancellations Section */}
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[24px] h-[24px]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="text-[14px] text-sm">My Cancellations</span>
              </div>
              {/* My Reviews Section */}
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 p-2 rounded-lg">
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.8284 6.93621C18.4517 6.93621 18.7176 7.72859 18.2205 8.10461L14.8905 10.6234C14.1688 11.1693 13.8661 12.1087 14.1334 12.9732L15.3864 17.0261C15.5735 17.6312 14.8729 18.1193 14.3701 17.7341L11.3075 15.3879C10.536 14.7969 9.46399 14.7969 8.69251 15.3879L5.61357 17.7466C5.11152 18.1312 4.41161 17.645 4.59677 17.0403L5.83243 13.0046C6.09532 12.146 5.79694 11.2145 5.08413 10.6684L1.73432 8.1022C1.24111 7.72436 1.50831 6.93621 2.12961 6.93621H6.12744C7.07024 6.93621 7.90305 6.32198 8.18152 5.42125L9.379 1.5479C9.5678 0.937212 10.4322 0.937216 10.621 1.5479L11.8185 5.42124C12.0969 6.32198 12.9298 6.93621 13.8726 6.93621H17.8284Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                  />
                </svg>

                <span className="text-[14px] text-sm ">My Reviews</span>
              </div>

              {/* Logout Section */}
              <div
                className="flex items-center space-x-2 cursor-pointer hover:bg-gray-300 p-2 rounded-lg"
                onClick={() => logout()}
              >
                <svg
                  width="19"
                  height="18"
                  viewBox="0 0 19 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 9H11.5M4 12L1 9L4 6M9 4V3C9 2.46957 9.21071 1.96086 9.58579 1.58579C9.96086 1.21071 10.4696 1 11 1H16C16.5304 1 17.0391 1.21071 17.4142 1.58579C17.7893 1.96086 18 2.46957 18 3V15C18 15.5304 17.7893 16.0391 17.4142 16.4142C17.0391 16.7893 16.5304 17 16 17H11C10.4696 17 9.96086 16.7893 9.58579 16.4142C9.21071 16.0391 9 15.5304 9 15V14"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="text-[14px] text-sm">Logout</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbarpage
