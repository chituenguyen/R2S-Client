import { useQueryClient, useQuery } from "@tanstack/react-query"
import { fetchTopic, Topic } from "../redux/api/post"
import ReactMarkdown from "react-markdown"
import moment from "moment"
import { useParams } from "react-router-dom"

const PostDetail = () => {
  const { id } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery<Topic>({
    queryKey: ["topics", id],
    queryFn: () => fetchTopic(id)
  })

  if (isLoading) return <p className="text-center text-lg">Loading...</p>
  if (error)
    return (
      <p className="text-center text-red-500">
        Error: {(error as Error).message}
      </p>
    )

  const formattedDate = moment(data?.createdAt).format("DD/MM/YYYY")

  console.log(data)

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-lg bg-white border">
      <h1 className="text-xl font-bold text-gray-900">{data?.title}</h1>
      <div className="flex items-center text-sm text-gray-600 mt-2">
        <span className="mr-4">📅 {formattedDate}</span>
        <span>👁️ {data?.viewCount}</span>
      </div>
      <p className="text-gray-700 mt-4">{data?.description}</p>
      <h2 className="text-lg font-semibold text-gray-900 mt-6">
        Nội dung bài viết
      </h2>
      <div className="text-gray-700 mt-2">
        <p className="prose">
          <ReactMarkdown>{data?.content}</ReactMarkdown>
        </p>
      </div>
    </div>
  )
}

export default PostDetail
