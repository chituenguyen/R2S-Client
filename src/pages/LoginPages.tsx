import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white pt-[50px] pb-[100px]">
      <div className="hidden md:block w-1/2 h-screen relative">
        <img
          src="/assets/images/signup-pic.png"
          alt="Signup Illustration"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center px-16 py-10">
        <LoginForm />
      </div>
    </div>
  );
}
