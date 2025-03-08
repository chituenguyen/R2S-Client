// import { BrowserRouter, useRoutes } from 'react-router-dom'
// import { routes } from './routes'
// import PostListQuery from '../components/query_react/PostList'

// const RouterContent = () => {
//   const element = useRoutes(routes)
//   return element
// }

// export const Router = () => {
//   return (
//     <BrowserRouter>
//       <PostListQuery />
//       <RouterContent />
//     </BrowserRouter>
//   )
// }


import { useRoutes } from 'react-router-dom'
import { routes } from './routes'

export const Router = () => {
  return useRoutes(routes)
}