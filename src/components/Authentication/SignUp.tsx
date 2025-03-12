import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";


function SignUp(){
  return(
    <div className="flex h-screen">
    <div className="w-2/3 bg-blue-100 flex justify-center items-center">
    <img src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K2Hla1RJW2hhJuUGqF1wo3ntGOIwkYPowANn3pKglx5jZVRaSJRrbIpuUaa8kWoClS-20A1rQ0MB3eOCUup64yHkSDbrzp482PArEdNYb~yDvbnSjtZLQORMxREpumXWU1LEmnkYGlxVvHkYJ0fpvD0nONV1lKEPohpSn54FyKdTk0x~5jVU8DwOIQgAqLT-9Ce0nucyChZK2tdSjPYIYmA65bOex9d-WYIOdePt03mxdtFBzyw2oRsQ4pA9j7e-bVSIuQaxufUdbh9Rlz0ylZDssdRq4gZMeqif8X71cpHTb4zHB5OlSrIMqJg1RxlxIxx8mnHFLHYyTHKwBulL3w__" alt="Shopping Cart" className="max-w-md" />
  </div>
  <div className="w-1/3 bg-gray-100 flex flex-col justify-center items-center p-8">
    <div className="text-2xl font-bold mb-2">Create an account</div>
    <div className="text-sm text-gray-600 mb-6">Enter your details below</div>
    <input type="text" placeholder="Name" className="border border-gray-300 rounded-md p-2 mb-4 w-full" />
    <input type="text" placeholder="Email or Phone Number" className="border border-gray-300 rounded-md p-2 mb-4 w-full" />
    <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2 mb-6 w-full" />
    <button className="bg-red-500 text-white rounded-md p-2 mb-4 w-full">Create Account</button>
    <button className="border border-gray-300 rounded-md p-2 mb-6 w-full flex justify-center items-center space-x-2">
      <FcGoogle />
      <div>Sign up with Google</div>
    </button>
    <div className="text-sm text-gray-600">
      Already have account? <Link to="/signin" className="text-blue-500">Log in</Link>
    </div>
  </div>
</div>
  )
}export default SignUp;
