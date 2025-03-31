import { ReactElement } from "react"
import Table from "../components/table/Table"
import SigninPage from "../components/aut/Signin"
import AdminProductPage from "../components/admin/AdminProductPage"

function Admin(): ReactElement {
  return (
    <div className="">
        <AdminProductPage />
    </div>
  )
}

export default Admin