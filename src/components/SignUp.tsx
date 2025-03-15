import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", formData);

      toast.success("Account created successfully!", { autoClose: 1500 });
      
      setTimeout(() => {
        window.location.href = "/login"; // Chuyển hướng sau khi đăng ký thành công
      }, 2000);
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex bg-white overflow-hidden w-[1000px] h-[500px]">
        <div className="w-1/2 hidden md:block rounded">
          <img src="/SideImage.svg" alt="Sign Up" className="w-full h-full object-cover rounded" />
        </div>
        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-[36px] mb-1 font-[Inter]">Create an account</h2>
          <p className="mb-8 text-gray-600 text-[16px]">Enter your details below</p>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mb-4 border-b border-gray-400 text-gray-500 text-[16px] outline-none"
          />
          <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"} // Toggle between password and text
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full mb-4 border-b border-gray-400 text-gray-500 text-[16px] outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="absolute right-2 top-1/4 transform -translate-y-1/2 text-gray-500"
          >
             {showPassword ? <img src="/ShowPass.svg" alt="ShowPass" className="w-[20px] h-[20px] cursor-pointer" /> :
             <img src="/hide.png" alt="ShowPass" className="w-[20px] h-[20px] cursor-pointer" />}
          </button>
          </div>
          <button onClick={handleSignUp} className="w-full bg-red-500 text-white py-2 rounded text-[16px]">Create Account</button>
          <button className="flex items-center justify-center w-full h-[56px] mt-4 border border-black/40 rounded-[4px]">
            <img src="/Google.svg" alt="Google" className="w-[24px] h-[24px]" />
            <span className="ml-4 text-[16px]">Sign up with Google</span>
          </button>
          <p className="mt-4 text-center text-gray-700">Already have an account? <a href="/login" className="text-black ml-4 hover:border-b-2 hover:border-black">Log in</a></p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;