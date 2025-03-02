import { ReactElement } from 'react'
import UseEffectDemo from '../components/effect'
import UserList from '../components/effect/api'
function About(): ReactElement {
  return <div>
    About
    <UseEffectDemo />
    <UserList />
  </div>
}

export default About
