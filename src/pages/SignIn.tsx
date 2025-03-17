import { ReactElement } from "react"
import SignIn from "../components/Authentication/FormSignIn"

function Signin(): ReactElement {
    return (
      <div className="min-h-screen w-full">
          <SignIn />
      </div>
    );
  }
  
  export default Signin;