import { RouteObject } from 'react-router-dom'
<<<<<<< Updated upstream
import Home from '../pages/Home'
import About from '../pages/About'
=======
import HomePage from '../pages/HomePage'
import Postpage from '../pages/PostPage'
import SignUp from '../pages/SignUp'
import SignIn from '../pages/SignIn'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Cart from '../Cart/Cart'

// import PostDetail from '../components/effect/postDetail'
>>>>>>> Stashed changes

export const routes: RouteObject[] = [
  {
    path: '/',
<<<<<<< Updated upstream
    element: <Home />,
    children: []
  },
  {
    path: '/about',
    element: <About />,
    children: []
=======
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
    path: '/about',
    element: <About/>,
    children:[]
  },
  {
    path: '/contact',
    element: <Contact/>,
    children:[]
>>>>>>> Stashed changes
  },
]