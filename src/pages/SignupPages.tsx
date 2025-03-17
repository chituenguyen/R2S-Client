import { FcGoogle } from "react-icons/fc";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SignUpForm from "../components/Signup";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex flex-grow items-center justify-center bg-gray-100 py-10">
        <div className="flex bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">

          <div className="hidden md:flex w-1/2 bg-blue-50 items-center justify-center">
            <img
              src="/assets/images/signup-pic.png"
              alt="Signup Illustration"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h2 className="text-2xl font-semibold text-gray-900">Create an account</h2>
            <p className="text-gray-600 mb-6">Enter your details below</p>

            <SignUpForm />

            <button className="w-full flex items-center justify-center border py-2 rounded-lg mt-4 hover:bg-gray-100 transition">
              <FcGoogle className="mr-2" size={20} /> Sign up with Google
            </button>

            <p className="text-gray-600 text-center mt-4">
              Already have an account? <a href="/login" className="text-red-500 font-semibold">Log in</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
