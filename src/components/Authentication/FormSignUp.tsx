import { Link, useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios"
import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { useState } from "react"
import { BiSolidShow } from "react-icons/bi";
import { BiShow } from "react-icons/bi";

// Định nghĩa kiểu dữ liệu cho form
interface Inputs {
  firstname: string
  lastname: string
  address: string
  email: string
  password: string
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // Hàm kiểm tra độ mạnh mật khẩu
  const validatePassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
    return regex.test(password)
  }

  // Gọi API đăng ký
  const registerUser = async (data: Inputs) => {
    if (!validatePassword(data.password)) {
      toast.error(
        "Password must be 8+ characters with an uppercase, lowercase, and number.",
        {
          position: "top-right",
          autoClose: 3000 // Closes after 3 seconds
        }
      )
      return Promise.reject(new Error("Invalid password format"))
    }
    try {
      const response = await axios.post(
        "https://devapi.uniscore.vn/uri/api/auth/register",
        data
      )
      return response.data
    } catch (error: any) {
      return Promise.reject(error) // 👈 Để useMutation bắt được lỗi từ API
    }
  }

  // useMutation với kiểu dữ liệu chuẩn
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created successfully!", { autoClose: 1500 })
      setTimeout(() => {
        navigate("/signin")
      }, 1500)
    },
    onError: (error: any) => {
      if (error.message === "Invalid password format") {
        // No action needed, already handled in validatePassword
      } else {
        toast.error("Email is already in use!") // Lỗi từ API
      }
    }
  })

  // Xử lý đăng ký
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data)
  }

  return (
    <div className="flex h-screen w-full">
      {/* Hình ảnh bên trái */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src="/assets/images/shoppingcard.jpg"
          alt="Shopping"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form đăng ký bên phải */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8 border-l border-gray-300">
        <div className="flex flex-col items-start">
          <h2 className="text-4xl font-bold mb-2">Create an account</h2>
          <p className="text-lg text-gray-600 mb-6">Enter your details below</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          {/* First Name and Last Name */}
          <div className="flex gap-4 mb-4">
            <input
              {...register("firstname", { required: "First name is required" })}
              type="text"
              placeholder="First Name"
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />
            {errors.firstname && (
              <p className="text-red-600 text-sm">{errors.firstname.message}</p>
            )}

            <input
              {...register("lastname", { required: "Last name is required" })}
              type="text"
              placeholder="Last Name"
              className="border border-gray-300 rounded-md p-2 w-1/2"
            />
            {errors.lastname && (
              <p className="text-red-600 text-sm">{errors.lastname.message}</p>
            )}
          </div>

          {/* Address */}
          <input
            {...register("address", { required: "Address is required" })}
            type="text"
            placeholder="Address"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address.message}</p>
          )}

          {/* Email */}
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address"
              }
            })}
            type="text"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="relative mb-4">
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="border border-gray-300 rounded-md p-2 mb-4 w-full"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/4 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <BiSolidShow />
              ) : (
                <BiShow />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm">{errors.password.message}</p>
          )}

          {/* Nút đăng ký */}
          <button
            type="submit"
            disabled={isPending}
            className="bg-red-500 text-white rounded-md p-2 mb-6 w-full hover:bg-red-600"
          >
            {isPending ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* Nút đăng ký với Google */}
        <button className="border border-gray-300 text-black rounded-md p-2 mb-4 w-3/4 max-w-xs flex justify-center items-center space-x-2 hover:bg-gray-200 mx-auto">
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        {/* Chuyển hướng đăng nhập */}
        <div className="text-sm text-gray-600 border-t pt-4 w-full text-center">
          Already have an account?{" "}
          <Link to="/signin" className="text-blue-500">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
