import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type Inputs = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  // API đăng nhập
  const loginUser = async (data: Inputs) => {
    const response = await axios.post("http://localhost:3000/api/auth/login", data);
    return response.data;
  };

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    mutate(data);
  };

  return (
    <div className="flex h-screen justify-center">
      {/* Hình ảnh bên trái */}
      <div className="hidden md:flex items-center w-1/2">
        <img
          src="/src/images/shoppingcard.jpg"
          alt="Shopping"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Form đăng nhập bên phải */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 bg-gray-100 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">Log in to Exclusive</h2>
        <p className="text-gray-600 mb-6">Enter your details below</p>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                message: "Invalid email address",
              },
            })}
            type="text"
            placeholder="Email or Phone Number"
            className="w-full border-b-2 p-2 mb-4 outline-none focus:border-black"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}

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
            className="w-full border-b-2 p-2 mb-4 outline-none focus:border-black"
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}

          <div className="flex justify-between w-full mt-4">
            <button
              type="submit"
              disabled={isPending}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition duration-300"
            >
              {isPending ? "Logging in..." : "Log In"}
            </button>
            <a href="#" className="text-red-500 hover:underline text-sm">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
