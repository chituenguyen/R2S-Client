import { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Productdetail from '../components/Productdetail'
import SignUpPage from '../pages/SignUppage'
import LoginPage from '../pages/LoginPage'
import AboutPage from '../pages/AboutPage'
import ContactPage from '../pages/ContactPage'
import CartPage from '../pages/CartPage'
import CheckoutPage from '../pages/CheckOutPage'
import Adminpage from '../Admin/Page/Adminpage'
import Dashboard from '../Admin/components/Dashboard'
import Orders from '../Admin/components/Orders'
import Products from '../Admin/components/Products'
import Settings from '../Admin/components/Settings'
import Users from '../Admin/components/Users'


export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    children: []
  },
  {
    path: '/home',
    element: <HomePage />,
    children: []
  },
  {
    path: '/product/:id',
    element: <Productdetail />,
    children: []
  },
  {
    path: '/sign-up/',
    element: <SignUpPage />,
    children: []
  },
  {
    path: '/login',
    element: <LoginPage />,
    children: []
  },
  {
    path: '/about',
    element: <AboutPage />,
    children: []
  },
  {
    path: '/contact',
    element: <ContactPage />,
    children: []
  },
  {
    path: '/cart',  
    element: <CartPage />,
    children: []
  },
  {
    path: '/checkout',  
    element: <CheckoutPage />,
    children: []
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
        path: 'settings',
        element: <Settings />
      }
    ]
  }
  
]
