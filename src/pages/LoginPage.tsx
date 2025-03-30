import { Link } from "react-router-dom";
import signup from "../../assets/signup.jpg";
import Navbarpage from "./Navbarpage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { login } from "../redux/slices/loginSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate, isPending, error } = useMutation({
    mutationFn: (data: { email: string, password: string }) => login(data.email, data.password),
    onSuccess: (data) => {
      // Show success toast notification
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        // Use the proper way to set icon for TypeScript compatibility
        icon: () => <span>🎉</span>,
        style: {
          background: "white",
          color: "#4CAF50"
        }
      });
      
      // Add a small delay before redirecting to see the toast
      setTimeout(() => {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/home');
      }, 2000);
    },
    onError: (error) => {
      // Show error toast notification
      toast.error(error.message || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      console.error(error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div className="max-w-[1440px] w-full mx-auto mt-10">
      {/* Add ToastContainer to render notifications */}
      <ToastContainer />
      
      {/* Navbar */}
      <Navbarpage />
      
      {/* Divider line */}
      <div className="w-full h-[1px] mt-5 border-t border-gray-300 opacity-30 mx-auto"></div>

      {/* Login Form */}
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
            Log in to Exclusive
          </h2>
          <p className="text-center mb-6">Enter your details below</p>

          <form onSubmit={handleSubmit}>
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
            
            <div className="flex justify-between">
              <button
                type="submit"
                disabled={isPending}
                className="w-[143px] h-[56px] py-3 bg-red-500 text-white font-bold rounded-md hover:bg-red-600"
              >
                {isPending ? 'Logging in...' : 'Log in'}
              </button>
              <p className="text-[#DB4444] mt-[10px] cursor-pointer">Forget Password?</p>
            </div>
          </form>
          
          {/* Error display */}
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;