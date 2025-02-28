import { ReactElement } from 'react'
import Login from '../components/Authentication/Login'

function Home(): ReactElement {
  return (
    <div className="">
      <div>This is home page</div>      
      <div className="overflow-x-auto rounded-lg shadow">
        <Login />

      </div>
    </div>
  )
}

export default Home
