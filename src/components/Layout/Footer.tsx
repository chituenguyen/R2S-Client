import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn} from "react-icons/fa"
import { Link } from "react-router-dom"
  
const Footer = () => {
    return (
      <footer className="bg-black text-white py-10 px-5 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div>
            <h3 className="text-xl font-bold">Exclusive</h3>
            <div className="mt-3 space-y-3">
              <p className="mt-3 font-bold">Subscribe</p>
              <p className="text-sm">Get 10% off your first order</p>
              <div className="mt-3 flex items-center border border-gray-400 rounded-md overflow-hidden">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="p-2 flex-1 bg-black text-white focus:outline-none"
                />
                <button className="bg-white text-black p-2">&gt;</button>
              </div>
            </div>
          </div>
  
          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="mt-3 space-y-3">
              <p className="mt-3 text-sm">
                111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
              </p>
              <p className="text-sm">exclusive@gmail.com</p>
              <p className="text-sm">+88015-88888-9999</p>
            </div>
          </div>
  
          {/* Account Section */}
          <div>
            <h3 className="text-lg font-semibold">Account</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li>My Account</li>
              <li>Login / Register</li>
              <li>Cart</li>
              <li>Wishlist</li>
              <li>Shop</li>
            </ul>
          </div>
  
          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-semibold">Quick Link</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li>Privacy Policy</li>
              <li>Terms Of Use</li>
              <li>FAQ</li>
              <li>Contact</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Download App</h3>
            <p className="mt-3 text-sm">Save $3 with App New User Only</p>
            <div className="flex items-center space-x-1">
              <img src="src/images/qrcode.jpg" alt="QR Code" className="h-20 w-20 object-cover rounded-lg shadow-lg" />
              <div className="flex flex-col space-y-3">
              <Link to="/download/googleplay">
                <img src="src/images/googleplay.png" alt="Google Play" className="h-14 md:h-16 object-contain" />
               </Link>
               <Link to="/download/appstore">
                <img src="src/images/appstore.png" alt="App Store" className="h-14 md:h-16 object-contain" />
               </Link>
               </div>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-5">
              <FaFacebookF className="cursor-pointer" />
              <FaTwitter className="cursor-pointer" />
              <FaInstagram className="cursor-pointer" />
              <FaLinkedinIn className="cursor-pointer" />
            </div>
          </div>
        </div>
  
        {/* Footer Bottom */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center text-sm">
          <p>&copy; Copyright Rimel 2022. All rights reserved.</p>
        </div>
      </footer>
    )
  }
  
  export default Footer