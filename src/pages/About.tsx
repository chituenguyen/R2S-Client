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
}

export default About