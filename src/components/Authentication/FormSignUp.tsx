import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Định nghĩa kiểu dữ liệu cho form
interface Inputs {
  name: string;
  email: string;
  password: string;
}

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  // Gọi API đăng ký
  const registerUser = async (data: Inputs) => {
    const response = await axios.post("http://localhost:3000/api/auth/register", data);
    return response.data;
  };

  // useMutation xử lý đăng ký
  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: () => {
      toast.success("Account created successfully!", { autoClose: 1500 });
      setTimeout(() => {
        navigate("/signin");
      }, 1500);
    },
    onError: () => {
      toast.error("Email is already in use!");
    },
  });

  // Xử lý đăng ký
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex h-screen w-full">
      {/* Hình ảnh bên trái */}
      <div className="hidden md:flex w-1/2 h-full">
        <img
          src="/src/images/shoppingcard.jpg"
          alt="Shopping"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form đăng ký bên phải */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8 border-l border-gray-300">
        <h2 className="text-3xl font-bold mb-2 -ml-20">Create an account</h2>
        <p className="text-sm text-gray-600 mb-6 -ml-20">Enter your details below</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
          {/* Name */}
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

          {/* Email */}
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

          {/* Password */}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

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
          Already have an account? <Link to="/signin" className="text-blue-500">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
