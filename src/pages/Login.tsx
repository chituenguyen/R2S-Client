import { ReactElement } from "react"
import Table from "../components/table/Table"
import Header from "../components/header/header"
import Footer from "../components/footer/Footer"
import LoginPage from "../components/aut/Login"

function Login(): ReactElement {
  return (
    <div className="">
      <Header />
      <LoginPage />
      <Footer />
    </div>
  )
}

export default Login
