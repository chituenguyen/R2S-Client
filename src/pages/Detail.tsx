import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { fetchTopic } from "../redux/slices/topicSlice"
import { Topic } from "../redux/types/user.types"
import ReactMarkdown from "react-markdown"
import moment from "moment"

function Detail(): ReactElement {
  const { id } = useParams()
  const dispatch = useDispatch()
  const topic: Topic = useAppSelector(
    (state: TopicState) => state.topics.topics
  )

  useEffect(() => {
    dispatch(fetchTopic(id))
  }, [id, dispatch])

  if (!topic || topic.id !== id) return <p>Loading...</p>

  const formattedDate = moment(topic.createdAt).format("DD/MM/YYYY")

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-lg bg-white border">
      <h1 className="text-xl font-bold text-gray-900">{topic.title}</h1>
      <div className="flex items-center text-sm text-gray-600 mt-2">
        <span className="mr-4">📅 {formattedDate}</span>
        <span>👁️ {topic.viewCount}</span>
      </div>
      <p className="text-gray-700 mt-4">{topic.description}</p>
      <h2 className="text-lg font-semibold text-gray-900 mt-6">
        Nội dung bài viết
      </h2>
      <div className="text-gray-700 mt-2">
        <p className="prose">
          <ReactMarkdown>{topic.content}</ReactMarkdown>
        </p>
      </div>
    </div>
  )
}
export default Detail
