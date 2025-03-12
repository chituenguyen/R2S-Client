import { RouteObject } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Signin from "../pages/Signin"
import Login from "../pages/Login"

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
  }
]
