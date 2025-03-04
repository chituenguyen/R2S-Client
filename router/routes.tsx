import { RouteObject } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'

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
  }
]