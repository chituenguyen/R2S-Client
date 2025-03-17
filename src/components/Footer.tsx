import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPaperPlane } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 px-6">
        <div>
          <h2 className="text-lg font-bold mb-3">Exclusive</h2>
          <p className="mb-2">Subscribe</p>
          <p className="text-gray-200 text-sm mb-4">Get 10% off your first order</p>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 pr-10 rounded-md text-black"
            />
            <FaPaperPlane className="absolute right-3 top-3 text-gray-600 cursor-pointer" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Support</h2>
          <p className="text-gray-200 text-sm">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p className="mt-2 text-gray-200">exclusive@gmail.com</p>
          <p className="mt-2 text-gray-200">+88015-88888-9999</p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Account</h2>
          <ul className="text-gray-200 space-y-2">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Quick Link</h2>
          <ul className="text-gray-200 space-y-2">
            <li>Privacy Policy</li>
            <li>Terms of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-3">Download App</h2>
          <p className="text-gray-400 text-sm mb-2">Save $3 with App New User Only</p>

          <div className="flex space-x-4 text-gray-400 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaLinkedinIn className="cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>

      <p className="text-center text-gray-400 text-sm mt-10">
        © Copyright Rimel 2022. All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
