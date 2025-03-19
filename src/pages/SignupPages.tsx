import SignUpForm from "../components/Signup";

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex flex-grow items-center justify-center bg-white py-10">
        <div className="flex w-full max-w-6xl">
          <div className="hidden md:block w-1/2">
            <img
              src="/assets/images/signup-pic.png"
              alt="Signup Illustration"
              className="w-full h-screen object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center px-16">
            <SignUpForm />
          </div>
        </div>
      </main>
    </div>
  );
}
