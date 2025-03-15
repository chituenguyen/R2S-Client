import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useForm, SubmitHandler } from "react-hook-form";

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

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("User Data:", data);
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
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            type="text"
            placeholder="Email or Phone Number"
            className="border border-gray-300 rounded-md p-2 mb-4 w-full"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

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
            className="border border-gray-300 rounded-md p-2 mb-6 w-full"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}

          <button
            type="submit"
            className="bg-red-500 text-white rounded-md p-2 mb-6 w-full hover:bg-red-600"
          >
            Create Account
          </button>
        </form>

        <button className="border border-gray-300 text-black rounded-md p-2 mb-4 w-3/4 max-w-xs flex justify-center items-center space-x-2 hover:bg-gray-200 mx-auto">
          <FcGoogle size={20} />
          <span>Sign up with Google</span>
        </button>

        <div className="text-sm text-gray-600 border-t pt-4 w-full text-center">
          Already have an account? <Link to="/signin" className="text-blue-500">Log in</Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
