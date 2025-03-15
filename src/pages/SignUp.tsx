import { ReactElement } from "react"
import SignUp from "../components/Authentication/FormSignUp"

function Signup(): ReactElement {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="mt-10">
          <SignUp />
        </div>
  
      </div>
    )
  }
export default Signup