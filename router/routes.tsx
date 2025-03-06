import { RouteObject } from 'react-router-dom'
// import Home from '../pages/Home'
import About from '../pages/About'
import PostList from '../components/PostList/PostList'
import PostDetail from '../components/PostList/PostDetail'

export const routes: RouteObject[] = [
  // {
  //   path: '/',
  //   element: <Home />,
  //   children: []
  // },
  {
    path: '/about',
    element: <About />,
    children: []
  },
  {
    path: '/post/:id',
    element: <PostDetail />,
    children: []
  },
  {
    path: '/',
    element: <PostList />,
    children: []
  }
]