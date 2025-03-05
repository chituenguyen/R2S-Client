import { ReactElement } from 'react'
import UseEffectDemo from '../components/effect'
import UserList from '../components/effect/api'
import TodoList from '../components/effect/todolist'
function About(): ReactElement {
  return <div>
    About
    {/* <UseEffectDemo /> */}
    {/* <UserList /> */}
    <TodoList />
  </div>
}

export default About
