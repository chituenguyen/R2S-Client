import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { fetchPostResponse } from "../../redux/slices/userSlice"
import { useAppSelector } from "../../redux/hooks"
import { PostsResponse, PostItem } from "../../redux/types/user.types"
import { Link } from "react-router-dom"

const UserList: React.FC = () => {
  const dispatch = useDispatch()
  const { posts } = useAppSelector((state: PostResponse) => state.posts)

  useEffect(() => {
    dispatch(fetchPostResponse())
  }, [dispatch])

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Post List</h1>
      <h1>{posts?.total}</h1>
      {posts?.items?.map((post: PostItem) => (
        <Link to={`/detail/${post.id}`} className="space-y-4">
          <div
            key={post.title}
            className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-600">
              {post.title}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default UserList
