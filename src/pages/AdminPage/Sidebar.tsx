import { Link } from "react-router-dom";

function Sidebar(){
    return(
        <div>
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-4 h-screen">
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                        {/* Avatar */}
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.904-1.076.388-1.503-2.698-3.195-2.698-5.739 0-2.541 2.145-4.636 4.8-4.636 2.655 0 4.8 2.095 4.8 4.636 0 3.041-1.698 4.636-3.195 5.739C16.847 17.345 14.5 16 12 16c-.38 0-.753.03.112.096a13.937 13.937 0 01-6.879 1.904"
                            ></path>
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="font-semibold">Hello, admin</p>
                    </div>
                </div>
                <nav>
                    <Link to="/admin"
                        className="block py-2 px-4 text-sm hover:bg-gray-700 rounded"
                    >
                        Product 
                    </Link>
                    <Link to="/admin/order"
                        className="block py-2 px-4 text-sm hover:bg-gray-700 rounded"
                    >
                        Order 
                    </Link>
                    <a
                        href="#"
                        className="block py-2 px-4 text-sm hover:bg-gray-700 rounded"
                    >
                        User
                    </a>
                </nav>
            </aside>
        </div>
    )
}

export default Sidebar;