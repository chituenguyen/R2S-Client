import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      console.log("User registered:", { name, email });
      navigate("/login", { state: { from: location.state?.from || "/" } });
    }, 500);
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
      <p className="text-gray-500 mb-6">Enter your details below</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          className="border-b w-full py-2 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email or Phone Number"
          className="border-b w-full py-2 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border-b w-full py-2 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md">
          Create Account
        </button>
      </form>

      <button className="w-full flex items-center justify-center border py-2 mt-4">
        <img src="/assets/icons/google.png" alt="Google" className="w-5 h-5 mr-2" />
        Sign up with Google
      </button>

      <p className="text-center mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          state={{ from: location.state?.from || "/" }}
          className="text-black-500 font-medium"
        >
          Log in
        </Link>
      </p>
    </div>
  );
};

export default SignUpForm;
