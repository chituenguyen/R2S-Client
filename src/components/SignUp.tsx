import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Hàm gọi API đăng ký
  const registerUser = async (formData: { email: string; password: string }) => {
    const response = await axios.post("http://localhost:3000/api/auth/register", formData);
    return response.data;
  };

  // useMutation với kiểu dữ liệu chuẩn
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created successfully!", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    },
    onError: () => {
      toast.error("Email is already in use!");
    },
  });

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
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
          <h2 className="text-[36px] mb-1 font-[Inter]">Create an account</h2>
          <p className="mb-8 text-gray-600 text-[16px]">Enter your details below</p>

          <form onSubmit={handleSignUp}>
            <input
              type="email"
              name="email"
              placeholder="Email"
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

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-500 text-white py-2 rounded text-[16px]"
            >
              {isPending ? "Creating..." : "Create Account"}
            </button>
          </form>

          <button className="flex items-center justify-center w-full h-[56px] mt-4 border border-black/40 rounded-[4px]">
            <img src="/Google.svg" alt="Google" className="w-[24px] h-[24px]" />
            <span className="ml-4 text-[16px]">Sign up with Google</span>
          </button>

          <p className="mt-4 text-center text-gray-700">
            Already have an account?
            <a href="/login" className="text-black ml-4 hover:border-b-2 hover:border-black">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
