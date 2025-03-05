import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchPostDetail } from "../redux/slices/userSlice"

function AboutDetail() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const {postDetail} = useSelector((state: any) => state.postDetail)
  useEffect(() => {
    if (id) dispatch(fetchPostDetail(id))
  }, [id])
  return <div>{
    postDetail.title
    }</div>
}

export default AboutDetail
