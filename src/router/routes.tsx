import { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Postpage from '../pages/PostPage'
import UserListPage from '../pages/UserListPage'

// import PostDetail from '../components/effect/postDetail'


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage/>,
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
