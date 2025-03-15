import { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Postpage from '../pages/PostPage'
import SignUp from '../components/Authentication/SignUp'
import SignIn from '../components/Authentication/SignIn'
import ProductDetail from '../components/Detail/Productdetail'

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
    path: '/signup',
    element: <SignUp/>,
    children:[]
  },
  {
    path: '/signin',
    element: <SignIn/>,
    children:[]
  },
  {
    path: '/detail/:slug',
    element: <ProductDetail/>,
    children:[]
  },


 
]
