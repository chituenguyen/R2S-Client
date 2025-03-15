import { ReactElement } from "react"
import Header from "../components/Header/Header"
import Footer from "../components/Layout/Footer"
import SignIn from "../components/Authentication/FormSignIn"

function Signin(): ReactElement {
    return (
      <div className="min-h-screen w-full">
        <header className="w-full h-28 bg-white ring-gray-900/5 mb-8 border-b border-gray-300">
          <Header />
        </header>
        <main className="w-full pt-8">
          <SignIn />
        </main>
        <Footer />
      </div>
    );
  }
  
  export default Signin;