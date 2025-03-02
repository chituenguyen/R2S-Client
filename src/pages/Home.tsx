import { ReactElement } from "react"
import Table from "../components/table/Table"
import Login from "../components/login/Login"
import FooterPage from "../components/footer/Footer"

function Home(): ReactElement {
  return (
    <div className="">
      <div className="overflow-x-auto rounded-lg shadow">
        <FooterPage />
      </div>
    </div>
  )
}

export default Home
