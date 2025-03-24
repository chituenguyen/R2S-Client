import { IoSend } from "react-icons/io5";
import { FaFacebookF,FaInstagram,FaLinkedinIn } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";


function Footer() {
    return(
        <div className="container w-full ring shadow-xl ring-gray-900/5 bg-black">
            <footer className="bg-black text-white py-12">
                <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        {/* Exclusive */}
                        <div>
                            <h3 className="text-lg font-bold mb-4">Exclusive</h3>
                            <p className="mb-2 font-medium">Subscribe</p>
                            <p className="mb-4 font-thin">Get 10% off your first order</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-transparent appearance-none border border-gray-600 rounded-md py-2 px-4 w-full focus:outline-none"
                                />
                                <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                    <IoSend className="text-white"/>
                                </button>
                            </div>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Support</h3>
                            <p className="mb-2">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</p>
                            <p className="mb-2">exclusive@gmail.com</p>
                            <p>+88015-88888-9999</p>
                        </div>

                        {/* Account */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Account</h3>
                            <p className="mb-2">My Account</p>
                            <p className="mb-2">Login / Register</p>
                            <p className="mb-2">Cart</p>
                            <p>Wishlist</p>
                            <p>Shop</p>
                        </div>

                        {/* Quick Link */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Link</h3>
                            <p className="mb-2">Privacy Policy</p>
                            <p className="mb-2">Terms Of Use</p>
                            <p className="mb-2">FAQ</p>
                            <p>Contact</p>
                        </div>

                        {/* Download App */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Download App</h3>
                            <p className="mb-4 text-xs">Save $3 with App New User Only</p>
                            <div className="grid grid-flow-col grid-rows-2 gap-4">
                                <img
                                    src="https://as1.ftcdn.net/v2/jpg/05/29/71/50/1000_F_529715063_RiB20Skm9T4qYoltG6VHkgLenfnP09Jl.jpg" // Replace with your QR code path
                                    alt="QR Code"
                                    className="h-[76px] w-[76px] row-span-2"
                                />
                                <img
                                    src="/assets/CHPlay.png" 
                                    alt=""
                                    className="h-[30px] w-[104px] border border-white rounded-lg"
                                />
                                <img src="/assets/AppStore.png" 
                                    alt="" 
                                    className="h-[30px] w-[104px] border border-white rounded-lg"
                                />
                            </div>
                            <div className="bg-black flex space-x-8 items-center justify-center p-4 text-xl">
                                <FaFacebookF/>
                                <CiTwitter/>
                                <FaInstagram/>
                                <FaLinkedinIn/>
                            </div>   
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;