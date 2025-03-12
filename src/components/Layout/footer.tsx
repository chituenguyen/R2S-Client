import React from "react";
import { IoSend } from "react-icons/io5";


function Footer() {
    return(
        <div className="container w-full ring shadow-xl ring-gray-900/5 bg-black">
            <footer className="flex text-xl  max-w-screen-xl items-center justify-between mx-auto my-24 p-4 text-white">
                <aside className="mb-3">
                    <h2 className="font-bold mb-3 text-xl">Exclusive  </h2>
                    <p className="mb-3 text-xl">Subscribe</p>
                    <p className="hover:underline mb-3 text-[16px]">Get 10% off your first order</p>
                    <label className=" border border-white  justify-center w-[150px]">
                        <input
                                  type="text"
                                  className="w-[150px] h-[48px] bg-transparent  focus:outline-none focus:ring-0 text-gray-700 placeholder:text-sm placeholder:p-2 "
                                  placeholder="Enter your email"
                                />
                                <button
                                  className="focus:outline-none text-black"
                                >
                                    <IoSend className="text-white"/>
                                </button>
                    </label>
                </aside>
                <nav>
                    <h6 className="mb-2 font-bold uppercase opacity-60">Support</h6>
                    <p className="hover:underline mb-3">111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
                    <p className="hover:underline mb-3">exclusive@gmail.com</p>
                    <p className="hover:underline mb-3">+88015-88888-9999</p>
                </nav>
                <nav>
                    <h6 className="mb-2 font-bold uppercase opacity-60">Account</h6>
                    <p className="hover:underline mb-3">My Account</p>
                    <p className="hover:underline mb-3">Login / Register</p>
                    <p className="hover:underline mb-3">Cart</p>
                    <p className="hover:underline mb-3">Wishlist</p>
                    <p className="hover:underline mb-3">Shop</p>
                </nav>
                <nav>
                    <h6 className="mb-2 font-bold uppercase opacity-60">Quick Link</h6>
                    <p className="hover:underline mb-3">Privacy Policy</p>
                    <p className="hover:underline mb-3">Terms Of Use</p>
                    <p className="hover:underline mb-3">FAQ</p>
                    <p className="hover:underline mb-3">Contact</p>
                </nav>
                <nav>
                    <h6 className="mb-2 font-bold uppercase opacity-60">Download App</h6>
                    <p className="hover:underline mb-3">Privacy Policy</p>
                    <p className="hover:underline mb-3">Save $3 with App New User Only</p>
                    <div className="bg-black text-white p-4 flex items-center justify-center space-x-4">
                        {/* <img src="your-qr-code-image.png" alt="QR Code" className="w-24 h-24"/> */}
                            <div>
                                <a href="#" className="block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    Google Play
                                </a>
                                <a href="#" className="block bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mt-2">
                                    App Store
                                </a>
                            </div>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-gray-300">f</a>
                        <a href="#" className="text-white hover:text-gray-300">t</a>
                        <a href="#" className="text-white hover:text-gray-300">o</a>
                        <a href="#" className="text-white hover:text-gray-300">in</a>
                            
                    </div>
                </nav>
            </footer>
        </div>
    )
}

export default Footer;