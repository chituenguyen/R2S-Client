import LoginForm from "../components/LoginForm";
import loginImage from "../../assets/images/signup-pic.png";

const LoginPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="hidden md:block w-1/2">
        <img src={loginImage} alt="Login" className="w-full h-full object-cover" />
      </div>

      <div className="w-full max-w-md px-8">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
