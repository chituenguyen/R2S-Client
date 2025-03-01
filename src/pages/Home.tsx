import { ReactElement } from "react"
import Table from "../components/table/Table"
import Login from "../components/login/Login"

function Home(): ReactElement {
  return (
    <div className="">
      <div className="overflow-x-auto rounded-lg shadow">
        <Login />
      </div>
    </div>
  )
}

export default Home
