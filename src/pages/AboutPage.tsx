import { Link } from "react-router-dom"

import Navbarpage from "./Navbarpage"

function AboutPage() {
  return (
    <div className="w-full mx-auto mt-10">
        <Link to="/home">
            <Navbarpage />
        </Link>
         {/* Thanh phân cách */}
      <div className="w-full h-[1px] mt-5 border-t border-gray-300 opacity-30 mx-auto"></div>
    </div>
  )
}

export default AboutPage
