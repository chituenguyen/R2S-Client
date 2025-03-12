import { ReactElement } from "react"
import Table from "../components/table/Table"
import Header from "../components/header/header"
import Footer from "../components/footer/Footer"
import SigninPage from "../components/aut/Signin"


function Signin(): ReactElement {
  return (
    <div className="">
      <Header />
      <SigninPage />
      <Footer />
    </div>
  )
}

export default Signin
