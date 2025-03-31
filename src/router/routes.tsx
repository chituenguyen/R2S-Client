import { RouteObject } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Signin from "../pages/Signin"
import Login from "../pages/Login"
import ProductDetail from "../pages/ProductDetail"
import Cart from "../pages/Cart"
import Checkout from "../pages/Checkout"
import Profile from "../pages/Profile"
import ProductLike from "../pages/ProductLike"
import AdminProduct from "../pages/AdminProduct"
import Admin from "../pages/Admin"
import AdminOrder from "../pages/OrdersAdmin"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: []
  },
  {
    path: "/about",
    element: <About />,
    children: []
  },
  {
    path: "/contact",
    element: <Contact />,
    children: []
  },
  {
    path: "/signin",
    element: <Signin />,
    children: []
  },
  {
    path: "/login",
    element: <Login />,
    children: []
  },
  {
    path:"/productdetail/:id",
    element: <ProductDetail />,
    children: []
  },
  {
    path:"/cart",
    element: <Cart/>,
    children: []
  },
  {
    path:'/checkout',
    element: <Checkout />,
    children: []
  },
  {
    path:'/profile',
    element: <Profile/>,
    children:[]
  },
  {
    path:'/wishlist',
    element: <ProductLike />,
    children: []
  },
  {
    path:'/admin',
    element:<Admin/>,
    children:[]
  },
  {
    path:'/admin/product',
    element: <AdminProduct/>,
    children: []
  },{
    path:'/admin/order',
    element:<AdminOrder/>,
    children:[]
  }
]
