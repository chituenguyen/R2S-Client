import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Cập nhật giá trị input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gọi API đăng nhập
  const loginUser = async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post("http://localhost:3000/api/auth/login", { email, password });
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login success:", data);
      localStorage.setItem("accessToken", data.tokens.accessToken);
      localStorage.setItem("isLoggedIn", "true"); 
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Logged in successfully!", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
      
    },
    onError: () => {
      toast.error("Login failed! Please try again.");
    },
  });
  

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password.");
      return;
    }
    mutate(formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex bg-white overflow-hidden w-[1000px] h-[500px]">
        <div className="w-1/2 hidden md:block rounded">
          <img src="/SideImage.svg" alt="Sign Up" className="w-full h-full object-cover rounded" />
        </div>

        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-[36px] mb-1 font-[Inter]">Log in to Exclusive</h2>
          <p className="mb-8 text-gray-600 text-[16px]">Enter your details below</p>

          <form onSubmit={handleLogin}>
            <input
              type="text"
              name="email"
              placeholder="Email or Phone Number"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 border-b border-gray-400 text-gray-600 text-[16px] outline-none"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mb-4 border-b border-gray-400 text-gray-600 text-[16px] outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/4 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <img src="/ShowPass.svg" alt="Show Password" className="w-[20px] h-[20px] cursor-pointer" />
                ) : (
                  <img src="/hide.png" alt="Hide Password" className="w-[20px] h-[20px] cursor-pointer" />
                )}
              </button>
            </div>

            <div className="flex justify-between items-center">
              <button type="submit" disabled={isPending} className="w-[143px] bg-red-500 text-white py-2 rounded text-[16px]">
                {isPending ? "Logging in..." : "Log In"}
              </button>
              <a href="/forgot-password" className="text-red-500">Forgot Password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
