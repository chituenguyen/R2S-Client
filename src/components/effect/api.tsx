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
      <h1 className="text-2xl font-bold mb-6 text-center">Post List</h1>
      {posts?.items?.map((post: PostItem) => (
        <Link to={`/detail/${post.id}`} className="space-y-4">
          <div
            key={post.id}
            className="p-5 border rounded-lg bg-emerald-400 shadow-sm hover:shadow-lg transition-shadow  w-[800px] my-3"
          >
            <h3 className="text-lg font-semibold text-white">{post.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default UserList
