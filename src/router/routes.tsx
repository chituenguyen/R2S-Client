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
import Adminpage from '../Admin/AdminPage'
import Dashboard from '../Admin/DashBoard'
import Users from '../Admin/User'
import Orders from '../Admin/Orders'
import Products from '../Admin/Products'
import Setting from '../Admin/Setting'
import MqttComponent from '../components/MqttComponent'

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
  {
    path: '/mqtt',
    element: <MqttComponent/>,
    children:[]
  },
  {
    path: '/admin',
    element: <Adminpage />,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'orders',
        element: <Orders />
      },
      {
        path: 'products',
        element: <Products />
      },
      {
        path: 'setting',
        element: <Setting />
      }
    ]
  }
  
]