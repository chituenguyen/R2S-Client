import { useForm } from "react-hook-form";

type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const onSubmit = (data: SignUpFormData) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
  <input
    {...register("name", { required: "Name is required" })}
    type="text"
    placeholder="Name"
    className="w-full p-4 border border-gray-300 rounded-lg text-lg"
  />
  {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

  <input
    {...register("email", { required: "Email is required" })}
    type="email"
    placeholder="Email or Phone Number"
    className="w-full p-4 border border-gray-300 rounded-lg text-lg"
  />
  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

  <input
    {...register("password", { required: "Password is required", minLength: 6 })}
    type="password"
    placeholder="Password"
    className="w-full p-4 border border-gray-300 rounded-lg text-lg"
  />
  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

  <button
    type="submit"
    className="w-full bg-red-500 text-white py-4 rounded-lg text-lg font-semibold hover:bg-red-600 transition"
  >
    Create Account
  </button>
</form>
  );
}
