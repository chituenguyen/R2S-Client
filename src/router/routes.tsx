import { RouteObject } from 'react-router-dom'
import About from '../pages/About'
import HomePage from '../pages/HomePage'
import Postpage from '../pages/PostPage'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import Contact from '../pages/Contact'
import Cart from '../pages/Cart'
import Profile from '../pages/Profile'
import CheckOut from '../pages/CheckOut'

// import PostDetail from '../components/effect/postDetail'
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage/>,
    children: []
  },
  {
    path: '/about',
    element: <About/>,
    children: []
  },
  {
   path: '/postpage/:id',
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
    path: '/contact',
    element: <Contact/>,
    children:[]
  },
  {
    path: '/cart',
    element: <Cart/>,
    children:[]
  },
  {
    path: '/profile',
    element: <Profile/>,
    children:[]
  },
  {
    path: '/checkout',
    element: <CheckOut/>,
    children:[]
  },
]