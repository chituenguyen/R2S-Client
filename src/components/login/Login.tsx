import { useState } from "react";
import { FaSignInAlt } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email:", email, "Password:", password);
    // Gọi API đăng nhập tại đây
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-500 to-pink-500">
      {/* Navbar - Cố định trên đầu trang */}
      <div className="fixed top-0 left-0 w-full bg-black py-4 px-6 flex justify-between items-center z-50">
        <div className="flex items-center space-x-6">
          <img
            src="/src/components/images/logo.png"
            alt="SkyProperties"
            className="h-8"
          />
          <a href="#" className="hover:underline text-white">
            Screenshots
          </a>
          <a href="#" className="hover:underline text-white">
            Property Listings
          </a>
        </div>
        <div className="text-white">
          <a href="#" className="hover:underline">
            Login
          </a>
        </div>
      </div>

      {/* Nội dung chính */}
      <div className="mt-20 w-full flex flex-col items-center">
        {/* Logo */}
        <div className="flex justify-center items-center mb-16">
          <img
            src="/src/components/images/logo.png"
            alt="SkyProperties"
            className="h-16"
          />
        </div>

        {/* Login Form */}
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-2xl w-full pb-16">
          <p className="text-center text-gray-700 mb-4">
            To login as admin, please use the credentials below:
          </p>
          <p className="text-center text-sm font-semibold mb-6">
            <span className="text-black font-bold">Email:</span>{" "}
            <span className="text-gray-700">admin@tadabase.io</span>
            <br />
            <span className="text-black font-bold">Password:</span>{" "}
            <span className="text-gray-700">123456</span>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col items-start">
    <label className="text-gray-700 font-medium mb-2">Email Address</label>
    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className="w-full px-4 py-3 border rounded-full bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
      required
    />
  </div>

  <div className="mb-6 flex flex-col items-start">
    <label className="text-gray-700 font-medium mb-2">Password</label>
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="w-full px-4 py-3 border rounded-full bg-gray-100 focus:outline-none focus:ring focus:ring-blue-300"
      required
              />
            </div>

            {/* Sign In Button */}
            <div className="flex justify-center">
              <label className="w-0/6 text-gray-700 font-medium text-right mb-2"></label>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-full hover:bg-green-600"
              >
                SIGN IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
