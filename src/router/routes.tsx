import { RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import AboutDetail from '../pages/AboutDetail'

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
    path: '/about/:id',
    element: <AboutDetail />,
    children: []
  }
]