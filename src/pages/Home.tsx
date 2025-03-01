import { ReactElement } from 'react'
import Login from '../components/Authentication/Login';
import UserList from '../components/hookcout';


function Home(): ReactElement {
  return (
    <div className="">
      <div>This is home page</div>      
      <div className="overflow-x-auto rounded-lg shadow">
      <UserList/>
      </div>
    </div>
  )
}

export default Home
