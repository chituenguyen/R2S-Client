import { ReactElement } from "react"
import Table from "../components/table/Table"
import SigninPage from "../components/aut/Signin"
import OrderPage from "../components/admin/OrderPage"


function AdminOrder(): ReactElement {
  return (
    <div className="">
        <OrderPage />
    </div>
  )
}

export default AdminOrder