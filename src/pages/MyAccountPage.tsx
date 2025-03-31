import React from "react";
import { Link } from "react-router-dom";

const MyAccountPage = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 flex gap-12 pb-20">
      <div className="w-1/5 p-4 border-r">
        <ul className="space-y-4 text-gray-700">
          <li className="text-lg font-semibold">
            Manage My Account
          </li>
          <li>
            <Link to="/my-account/profile" className="block text-sm text-gray-600 hover:text-red-500">
              My Profile
            </Link>
          </li>
          <li>
            <Link to="/my-account/address-book" className="block text-sm text-gray-600 hover:text-red-500">
              Address Book
            </Link>
          </li>
          <li>
            <Link to="/my-account/my-payment" className="block text-sm text-gray-600 hover:text-red-500">
              My Payment Options
            </Link>
          </li>
          <li className="text-lg font-semibold">
            My Orders
          </li>
          <li>
            <Link to="/orders" className="block text-sm text-gray-600 hover:text-red-500">
              My Returns
            </Link>
          </li>
          <li>
            <Link to="/cancel" className="block text-sm text-gray-600 hover:text-red-500">
              My Cancellation
            </Link>
          </li>
          <li className="text-lg font-semibold">
            <Link to="/wishlist" className="block text-sm text-gray-600 hover:text-red-500">
              My Wishlist
            </Link>
          </li>
        </ul>
      </div>
      <div className="w-[900px] h-[650px] p-12 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-semibold text-red-500 mb-6">Edit Your Profile</h2>


        <form>
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <label className="text-lg font-semi mb-4">First Name</label>
              <input type="text" className="w-full p-3 border rounded-md bg-gray-200" />
            </div>
            <div>
              <label className="text-lg font-semi mb-4">Last Name</label>
              <input type="text" className="w-full p-3 border rounded-md bg-gray-200" />
            </div>
          </div>


          <div className="grid grid-cols-2 gap-8 mb-6">
            <div>
              <label className="text-lg font-semi mb-4">Email</label>
              <input type="email" placeholder="@example.com" className="w-full p-3 border rounded-md bg-gray-200" />
            </div>
            <div>
              <label className="text-lg font-semi mb-4">Address</label>
              <input type="text" placeholder="Street, City, Country" className="w-full p-3 border rounded-md bg-gray-200" />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Password Changes</h3>

            <div className="mb-4">
              <input type="password" placeholder="Current Password" className="w-full p-3 border rounded-md bg-gray-200" />
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <input type="password" placeholder="New Password" className="w-full p-3 border rounded-md bg-gray-200" />
              </div>
              <div>
                <input type="password" placeholder="Confirm Password" className="w-full p-3 border rounded-md bg-gray-200" />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-6">
            <button type="button" className="px-6 py-2 rounded-md">Cancel</button>
            <button type="submit" className="px-8 py-2 bg-red-500 text-white rounded-md">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyAccountPage;
