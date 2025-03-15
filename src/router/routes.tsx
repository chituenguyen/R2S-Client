import { RouteObject } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";
import Detail from "../components/Detail"; // Import trang chi tiết sản phẩm
import Cart from "../components/Cart"; // Import trang giỏ hàng

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/detail/:id", // Thêm route cho trang chi tiết sản phẩm
    element: <Detail />,
  },
  {
    path: "/cart", // Thêm route cho giỏ hàng
    element: <Cart />,
  },
];
