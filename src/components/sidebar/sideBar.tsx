import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar: React.FC = () => {
    const [active, setActive] = useState("My Profile")
    const menuItems = [
        { name: "My Profile", path:'/profile'},
        { name: "Address Book", path:'/' },
        { name: "My Payment Options" },
      ];    
    return (
        <div className="w-64 p-4 hidden md:block">
        <div className="mb-4">
            <h3 className="font-semibold text-black">Manage My Account</h3>
            {menuItems.slice(0,3).map((item)=>(
                <div key={item.name} className="mt-2 flex flex-col">
                    <Link to={item.path} onClick={() => setActive(item.name)} className={`block cursor-pointer ${active === item.name ? "text-red-500 font-medium" : "text-gray-400"}`}>{item.name}</Link>
                </div>
            ))}
        </div>
        <div className="mb-4">
            <h3 className="font-semibold text-black">My Orders</h3>
            <div className="mt-2 flex flex-col">
            <Link className="text-gray-400">My Returns</Link>
            <Link className="text-gray-400">My Cancellations</Link>
            </div>
        </div>
        <div>
            <h3 className="font-semibold text-black">My WishList</h3>
        </div>
        </div>
  );
};

export default Sidebar;