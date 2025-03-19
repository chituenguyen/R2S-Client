import { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'
// import SignUpPage from "../pages/SignupPages";
// import ProductDetailPage from '../pages/ProductDetailPage';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
    children: []
  }
]
