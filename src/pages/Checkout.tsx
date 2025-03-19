import { ReactElement } from "react"
import Table from "../components/table/Table"
import SigninPage from "../components/aut/Signin"
import CheckOutPage from "../components/homepage/CheckoutPage"

function Checkout(): ReactElement {
  return (
    <div className="">
        <CheckOutPage/>
    </div>
  )
}

export default Checkout