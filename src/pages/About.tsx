<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { ReactElement } from 'react'
import UseEffectDemo from '../components/effect'
import UserList from '../components/effect/api'
import PostList from '../components/postList/PostList'

function About(): ReactElement {
  return <div>
    About
    {/* <UseEffectDemo /> */}
    <PostList />
  </div>
=======
=======
>>>>>>> Stashed changes
import { ReactElement } from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Layout/Footer"

function About(): ReactElement {
  return (
    <div className="">
      <Header />
      <Footer />
    </div>
  )
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
}

export default About