import { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { signUp } from "../api/axios";

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    console.log("Đang gửi request:", formData);
  
    try {
      const res = await signUp(formData.email, formData.password, formData.fullName);
      console.log("Response từ server:", res);
  
      alert("Signup success");
    } catch (err: any) {
      console.error("Lỗi", err);
      setError(err.message || "Signup failed!");
    }
  
    setLoading(false);
  };
  

  return (
    <div className="w-full max-w-sm">
      <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
      <p className="text-gray-500 mb-6">Enter your details below</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-2 mb-4 outline-none focus:border-black"
        />
        <input
          type="text"
          name="email"
          placeholder="Email or Phone Number"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-2 mb-4 outline-none focus:border-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-2 mb-6 outline-none focus:border-black"
          required
        />

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md mb-4"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <button className="w-full flex items-center justify-center border py-2 rounded-lg hover:bg-gray-100 transition mb-4">
        <FcGoogle className="mr-2" size={20} /> Sign up with Google
      </button>

      <div className="text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-red-500">
          Log in
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
