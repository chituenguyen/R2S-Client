import React, { useEffect, useState } from "react"
import Sidebar from "../sidebar/sideBar"

const ProfilePage: React.FC= () =>{
    const [email, setEmail] = useState();

    useEffect(()=>{
        const savedEmail = JSON.parse(localStorage.getItem("user"))
        setEmail(savedEmail)
    }, [])
    return(
    <div className="max-w-7xl mx-auto p-6 space-y-10">
        <div className="space-x-2">
            <span className="text-sm text-zinc-500">Home /</span>
            <span className="text-sm">My Account</span>
        </div>
        <div className="flex space-x-44">
            <Sidebar />
            <div className="flex justify-center min-h-screen">
                <div className="p-6 w-full h-fit max-w-2xl">
                    <h2 className="text-red-500 text-lg font-semibold mb-4">Edit Your Profile</h2>
                    <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-gray-600">First Name</label>
                        <input type="text" className="w-full border rounded-md p-2 bg-gray-100" />
                    </div>
                    <div>
                        <label className="text-gray-600">Last Name</label>
                        <input type="text" className="w-full border rounded-md p-2 bg-gray-100"  />
                    </div>
                    <div className="col-span-2">
                        <label className="text-gray-600">Email</label>
                        <input type="email" className="w-full border rounded-md p-2 bg-gray-100" value={email?.email} disabled />
                    </div>
                    <div className="col-span-2">
                        <label className="text-gray-600">Address</label>
                        <input type="text" className="w-full border rounded-md p-2 bg-gray-100" />
                    </div>
                    </div>
                    <h3 className="text-gray-700 font-semibold mt-4">Password Changes</h3>
                    <div className="mt-2">
                    <input type="password" className="w-full border rounded-md p-2 bg-gray-100" placeholder="Current Password"/>
                    </div>
                    <div className="mt-2">
                    <input type="password" className="w-full border rounded-md p-2 bg-gray-100" placeholder="New Password"  />
                    </div>
                    <div className="mt-2">
                    <input type="password" className="w-full border rounded-md p-2 bg-gray-100" placeholder="Confirm New Password" />
                    </div>
                    <div className="flex justify-between mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Cancel</button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-md">Save Changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ProfilePage