import { ReactElement } from 'react'
import UseEffectDemo from '../components/effect'
import UserList from '../components/effect/api'
import { TodoList } from '../components/todoList/TodoList'

function About(): ReactElement {
  return <div>
    About
    {/* <UseEffectDemo /> */}
    <TodoList />
  </div>
}

export default About