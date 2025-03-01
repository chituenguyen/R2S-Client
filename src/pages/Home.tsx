import { ReactElement } from 'react'
import Table from '../components/table/Table'

function Home(): ReactElement {
  return (
    <div className="">
      <div>This is home page</div>      
      <div className="overflow-x-auto rounded-lg shadow">
        <Table />
      </div>
    </div>
  )
}

export default Home
