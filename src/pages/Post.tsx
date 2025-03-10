import { useQuery } from "@tanstack/react-query"
import { fetchPost, Post } from "../redux/api/post"
import { Link } from "react-router-dom"

const PostList = () => {
  const { data, isLoading, error } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: fetchPost
  })

  if (isLoading) return <p className="text-center text-lg">Loading...</p>
  if (error)
    return (
      <p className="text-center text-red-500">
        Error: {(error as Error).message}
      </p>
    )

  console.log(data)

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Post List</h1>
      {data?.items.map((post) => (
        <Link to={`/post/${post.id}`} className="space-y-4">
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

export default PostList
