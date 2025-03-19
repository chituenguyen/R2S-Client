import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3003/api/auth/login", formData);
      console.log("Login Success:", response.data);
      localStorage.setItem("token", response.data.access_token);
      navigate("/");
    } catch (err: any) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] w-full mx-auto">
      <h2 className="text-2xl font-semibold mb-2">Log in to Exclusive</h2>
      <p className="text-gray-500 mb-6">Enter your details below</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-2 mb-4 focus:outline-none focus:border-black"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border-b border-gray-300 py-2 mb-4 focus:outline-none focus:border-black"
          required
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 text-white py-3 px-6 rounded-md hover:bg-red-600 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
          <Link to="#" className="text-red-500 text-sm">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
