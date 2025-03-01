function Login() {
    return (
      <div>
        <div className="justify-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-20 h-20 pt-5 absolute top-16 left-[850px]"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
            />
          </svg>
        </div>
        <div className="pt-52">
          <div className="h-96 w-[675px] bg-slate-100 shadow-xl justify-self-center grid content-center rounded-md font-sans max-w-5xl">
            <p className="text-center">
              To login as admin, please use the credentials below:
            </p>
            <div className="text-center mt-10">
              <span className="font-bold">Email: </span>
              <span className="">admin@tadabase.io</span>
            </div>
            <div className="text-center">
              <span className="font-bold">Password: </span>
              <span className="">123456</span>
            </div>
            <div className="justify-items-center mt-5">
              <form>
                <label for="email">Email Address</label>
                <input
                  type="text"
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  className="w-96 h-10 bg-gray-300 border border-zinc-300 shadow-xl rounded-full ml-12 pl-5 pb-1"
                />
                <br></br>
                <label for="pass">Password</label>
                <input
                  type="text"
                  id="pass"
                  placeholder="Password"
                  name="pass"
                  className="w-96 h-10 bg-gray-300 border border-zinc-300 shadow-xl rounded-full ml-20 mt-3 pl-5 pb-1"
                />
                <br />
                <button className="w-[386px] h-10 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-full text-sm px-5 py-2.5 text-center ml-36 mt-3 shadow-xl">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default Login
  