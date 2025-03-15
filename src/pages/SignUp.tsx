import { ReactElement } from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Layout/Footer"
import SignUp from "../components/Authentication/FormSignUp"

function Signup(): ReactElement {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="mt-10">
          <SignUp />
        </div>
  
        <Footer />
      </div>
    )
  }
export default Signup