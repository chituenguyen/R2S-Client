import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/store";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);

  const fromPage = location.state?.from || "/";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("User logged in:", { email, password });
    login({ email });
    navigate(fromPage === "/signup" ? "/" : fromPage, { replace: true });
  };

  return (
    <div className="max-w-md w-full">
      <h2 className="text-4xl font-semibold mb-2">Log in to Exclusive</h2>
      <p className="text-gray-900 mb-6">Enter your details below</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email or Phone Number"
          className="w-full border-b p-2 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border-b p-2 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-red-500 text-white py-3 px-9 rounded-md hover:bg-red-600"
          >
            Log In
          </button>
          <button
            type="button"
            className="text-red-500 hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Forget Password?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
