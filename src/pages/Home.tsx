import { ReactElement } from 'react'
// import Table from '../components/table/Table'

import logo from "../../assets/login.png"
import sg from "../../assets/login.png"

function Home(): ReactElement {
  return (
    <div className='container'><div className="bg-gradient-to-r from-purple-500 to-pink-500 h-screen w-screen  flex flex-col ">
    <header className="w-full bg-black text-white py-4 px-8 flex items-center justify-between ">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 mr-2" />
        {/* <h1 className="text-lg font-bold">SkyProperties</h1> */}
      </div>
      <nav className="flex space-x-4 flex-grow ">
        <a href="#" className="text-gray-300 hover:text-white mx-7">
          Screenshots
        </a>
        <a href="#" className="text-gray-300 hover:text-white mx-7">
          Property Listings
        </a>
      </nav>
      <div className="flex justify-end">
        <a href="#" className="text-gray-300 hover:text-white mx-5">
          Login
        </a>
      </div>
    </header>
    <div className="flex justify-center items-end h-[150px]">
      <img src={logo} alt="Logo" className="h-16" />
    </div>
    <div className="flex-col flex items-center justify-center m-12">
      <div className="bg-white p-16 rounded-lg shadow-lg max-w-3xl  w-full text-center">
        <p className="text-center text-gray-700 mb-4">
          To login as admin, please use the credentials below:
        </p>
        <p className="text-center text-sm font-semibold mb-6 mt-10">
          <span className="text-black font-bold text-[16px]">Email:</span>{" "}
          <span className="text-gray-800">admin@tadabase.io</span>
          <br />
          <span className="text-black font-bold text-[16px]">
            Password:
          </span>{" "}
          <span className="text-gray-800">123456</span>
        </p>
        <form className="space-y-4 mt-4">
          <div>
            <label className="block text-gray-700 text-left">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-left">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 py-3 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
          >
            <span className="mr-2">
              <img className="w-6" src={sg} alt="" />
            </span>
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  </div></div>
    
  )
}

export default Home
