import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [user, setUser] = useState<{
    firstname: string;
    lastname: string;
    email: string;
    address: string;
    roles: string[];
    created_at: string;
  } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage (update this if using API)
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/signin"); // Redirect if not logged in
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.clear();
    setUser(null);
    navigate("/signin");
  };
  

  return (
    <div className="container mx-auto py-12 mt-24">
    <div className="flex items-center space-x-2 text-gray-500 text-[14px]">
      <a href="/" className="hover:underline">Home</a>
      /
      <span className="font-normal text-black">My Account</span>
    </div>
    <div className="flex min-h-screen mt-10">
      {/* Sidebar */}
      <aside className="w-1/3 bg-white rounded-lg">
        <h2 className="text-[16px] font-medium mb-4">Manage My Account</h2>
        <ul className="space-y-3 ml-8">
          <li className="text-[16px] text-gray-600 hover:text-red-500 cursor-pointer">My Profile</li>
          <li className="text-[16px] text-gray-600 hover:text-red-500 cursor-pointer">
            Address Book
          </li>
          <li className="text-[16px] text-gray-600 hover:text-red-500 cursor-pointer">
            My Payment Options
          </li>
        </ul>

        <h2 className="text-[16px] font-medium mt-6 mb-4">My Orders</h2>
        <ul className="space-y-3 ml-8">
          <li className="text-[16px] text-gray-600 hover:text-red-500 cursor-pointer">
            My Returns
          </li>
          <li className="text-[16px] text-gray-600 hover:text-red-500 cursor-pointer">
            My Cancellations
          </li>
        </ul>

        <h2 className="text-[16px] font-medium mt-6 mb-4">My Wishlist</h2>
        <button
          onClick={handleSignOut}
          className="mt-4 bg-red-500 text-[16px] text-white py-2 px-4 rounded-lg hover:bg-red-600"
        >
          SignOut
        </button>
      </aside>

      {/* Profile Form */}
      <div className="w-full h-full p-8 bg-white shadow-lg rounded-l ml-16">
        <h2 className="text-[20px] font-medium text-red-500 mb-6">Edit Your Profile</h2>
        
        <div className="grid grid-cols-[1.5fr_1fr] gap-6">
        {/* First Name */}
          <div>
            <label className="block text-[16px] mb-1">First Name</label>
            <input
              type="text"
              value={user?.firstname || ""}
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-[16px]"
              disabled
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-[16px] mb-1">Last Name</label>
            <input
              type="text"
              value={user?.lastname || ""}
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-[16px]"
              disabled
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[16px] mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-[16px] text-gray-600"
              disabled
              placeholder="Enter your email"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-[16px] mb-1">Address</label>
            <input
              type="text"
              value={user?.address || ""}
              className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-[16px]"
              disabled
              placeholder="Enter your address"
            />
          </div>
        </div>

        {/* Password Fields */}
        <h3 className="text-[16px] mt-6 mb-4">Password Changes</h3>
        <div className="grid grid-cols-1 gap-4">
          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-[16px] placeholder:text-gray-600"
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-[16px] placeholder:text-gray-600"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-2 border border-gray-300 rounded bg-gray-100 text-[16px] placeholder:text-gray-600"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button className="px-4 py-2 text-black text-[16px]">
            Cancel
          </button>
          <button className="px-6 py-2 bg-red-500 text-white rounded-lg text-[16px]">
            Save Changes
          </button>
        </div>
       
      </div>
    </div>
    </div>

  );
};

export default Profile;