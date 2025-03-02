import { ReactElement } from 'react'
import Table from '../components/table/Table'
import Login from '../components/Authentication/Login';
import UserList from '../components/hookcout';
import EverydayFresh from '../components/everydayfresh';
import DetailPost from '../components/everydayfresh';


function Home(): ReactElement {
  return (
    <div className="">
      <div>This is home page</div>      
      <div className="overflow-x-auto rounded-lg shadow">
      <Table />
      </div>
      <DetailPost />
    </div>
  )
}

export default Home
