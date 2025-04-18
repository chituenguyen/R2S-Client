import { Link } from "react-router-dom";
import signup from "../../assets/signup.jpg";
import google from "../../assets/google.jpg";
import Navbarpage from "./Navbarpage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { register } from "../redux/slices/registerSilce";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChatPage from "./ChatPage";

function SignUpPage() {
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: { name: string, email: string, password: string }) => register(data.name, data.email, data.password),
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      
      // Show success toast notification
      toast.success("Registration successful! Redirecting to login page...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        icon: () => <span>🎉</span>,
        style: {
          background: "white",
          color: "#4CAF50"
        }
      });
      
      // Add a small delay before redirecting to see the toast
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/login');
      }, 2000);
    },
    onError: (error) => {
      console.error("Error during registration:", error);
      
      // Show error toast notification
      toast.error(error.message || "Registration failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Gửi thông tin người dùng khi form được submit
    mutate({ name, email, password });
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto mt-10">
      {/* Add ToastContainer to render notifications */}
      <ToastContainer />
      
      {/* Navbar */}
      <Link to="/home">
        <Navbarpage />
      </Link>
      <ChatPage />
      {/* Thanh phân cách */}
      <div className="w-full h-[1px] mt-5 border-t border-gray-300 opacity-30 mx-auto"></div>

      {/* Form SignUp */}
      <div className="flex justify-around w-[1305px] h-[781px] mx-auto">
        <div className="w-[805px] h-[781px] ">
          <img
            className="w-[919px] h-[706px] mt-[75px] ml-[-8px] object-cover"
            src={signup}
            alt=""
          />
        </div>
        <div className="w-[371px] h-[530px] ml-[100px] mt-[150px]">
          <h2 className="text-[36px] font-semibold text-center mb-6">
            Create an account
          </h2>
          <p className="text-center mb-6">Enter your details below</p>

          <form onSubmit={handleSubmit}>
            {/* Name Input */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your name"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email or Phone Number
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your email or phone number"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
            >
              {isPending ? "Creating account..." : "Create Account"}
            </button>

            {/* Google SignUp Button */}
            <div className="flex items-center justify-center mt-4">
              <button
                type="button"
                className="w-full py-3 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-100"
              >
                <img
                  src={google}
                  alt="Google Logo"
                  className="w-7 h-7"
                />
                <span>Sign up with Google</span>
              </button>
            </div>
          </form>

          {/* Error display */}
          {error && <p className="text-red-500 mt-2">{error.message}</p>}

          {/* Redirect to Login Page */}
          <p className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:text-blue-600 cursor-pointer">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;