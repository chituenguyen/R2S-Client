import { ReactElement } from "react"
import SignUp from "../components/Authentication/FormSignUp"

function Signup(): ReactElement {
    return (
      <div className="flex flex-col min-h-screen">
          <SignUp />
      </div>
    )
  }
export default Signup