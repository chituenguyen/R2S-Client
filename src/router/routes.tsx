// 
import { RouteObject } from 'react-router-dom'
import PostList from '../components/PostList/PostList'
import PostListQuery from '../components/query_react/PostList'
import PostDetailQuery from '../components/query_react/PostDatail'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <PostListQuery />,
  },
  {
    path: '/posts/:slug',
    element: <PostDetailQuery />,
  },
  {
    path: '/post-list',
    element: <PostList />,
  },
  {
    path: '*', 
    element: <div>404 - Không tìm thấy trang</div>,
  }
]