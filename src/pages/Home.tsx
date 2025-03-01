import { ReactElement } from 'react'
import Table from '../components/table/Table'

function Home(): ReactElement {
  return (
    <body className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen">
    <header className="bg-black text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-6">
        <a href="SkyProperties">SkyProperties</a>
        <a href="#" className="hover:underline">Screenshots</a>
        <a href="#" className="hover:underline">Property Listings</a>
      </div>
      <nav>
        <a href="#" className="hover:underline">Login</a>
      </nav>
    </header>

    <div className="flex items-center justify-center mt-10">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-lg w-full">
        <p className="text-center mb-4">
          To login as admin, please use the credentials below:
        </p>
        <p className="text-center font-bold">
          Email:
          <span className="font-normal">admin@tadabase.io</span>
        </p>
        <p className="text-center font-bold">
          Password:
          <span className="font-normal">123456</span>
        </p>
        <form className="mt-4">
          <label className="block mb-2">Email Address</label>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg mb-4"
          />

          <label className="block mb-2">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg mb-4"
          />

          <button
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
          >
            SIGN IN
          </button>
        </form>
      </div>
    </div>
  </body>
  )
}

export default Home
