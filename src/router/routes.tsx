import { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import SignUp from '../components/Authentication/SignUp'
import SignIn from '../components/Authentication/SignIn'
import ProductDetail from '../pages/Productdetail'
import OrderPage from '../pages/OrderPage'
import Checkout from '../pages/Checkout'
import MyProfile from '../pages/Dashboard/MyProfile'
import AdminPage from '../pages/AdminPage/Admin'
import ProtectedRoute from '../router/ProtectedRoute';
import Order from '../pages/AdminPage/Oder'
// import PostDetail from '../components/effect/postDetail'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage/>,
    children: []
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
  {
    path: '/orders',
    element: <OrderPage/>,
    children:[]
  },
  {
    path: '/checkout',
    element: <Checkout/>,
    children:[]
  },
  {
    path: '/my-profile',
    element: <MyProfile/>,
    children:[]
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={['ADMIN']} userRoles={JSON.parse(localStorage.getItem('user') || '{}').roles || []} /> // Lấy roles từ localStorage
    ),
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
          path: 'order',
          element: <Order />,
      },
    ],
  },



]
