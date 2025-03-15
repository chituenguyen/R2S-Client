import { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Productdetail from '../components/Productdetail'
import SignUpPage from '../pages/SignUpPage'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    children: []
  },
  {
    path: '/product/:id',
    element: <Productdetail />,
    children: []
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
    children: []
  }
]
