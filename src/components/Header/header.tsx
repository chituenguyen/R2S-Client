
import { Link } from "react-router-dom"

function Header() {
    return(
        <header className="w-full h-28 bg-gray-700">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between h-full">
        <div className="flex justify-around items-center space-x-6">
          <Link to="/" className="text-white">
            Home
          </Link>
        </div>
        <nav>
          <ul className="flex items-center space-x-8 text-white text-2xl">
            <li>
            <Link
                to="/about"
                className="hover:text-green-300 text-decoration-none text-white"
              >
                About
              </Link>
            </li>
            <li>
            <Link
                to="/postpage"
                className="hover:text-green-300 text-decoration-none text-white"
              >
                Post
              </Link>
            </li>
           </ul>
        </nav>


        </div>
        </header>
    )
}

export default Header;