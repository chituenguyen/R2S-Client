import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppSelector } from "../redux/hooks"
import { fetchTopic } from "../redux/slices/topicSlice"
import { Topic } from "../redux/types/user.types"

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

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">{topic.id}</h1>
      <h1 className="text-2xl font-bold mb-6">{topic.description}</h1>
    </div>
  )
}
export default Detail
