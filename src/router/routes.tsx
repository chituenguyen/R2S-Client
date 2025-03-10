import { RouteObject } from "react-router-dom"
import Home from "../pages/Home"
import About from "../pages/About"
import Detail from "../pages/Detail"
import Post from "../pages/Post"
import PostDetail from "../pages/PostDetail"

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
    path: "/detail/:id",
    element: <Detail />,
    children: []
  },
  {
    path: "/post",
    element: <Post />,
    children: []
  },
  {
    path: "/post/:id",
    element: <PostDetail />,
    children: []
  }
]
