import { RouteObject } from 'react-router-dom'
import Home from '../pages/Login/Login'
import About from '../pages/About'
import Table from '../components/Table/Table'
import Banner from '../components/Banner/Banner'

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
    path: '/Table',
    element: <Table />,
    children: []
  },
  {
    path: '/Banner',
    element: <Banner />,
    children: []
  }
]
