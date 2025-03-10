import { RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Postpage from '../pages/PostPage'
import UserListPage from '../pages/UserListPage'

// import PostDetail from '../components/effect/postDetail'


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: []
  },
  {
    path: '/about',
    element: <About />,
    children: []
  },
  {
   path: '/postpage',
   element: <Postpage/>,
   children:[]
  },
  {
    path:'/userlistpage',
    element: <UserListPage/>,
    children: []
  },
 
]