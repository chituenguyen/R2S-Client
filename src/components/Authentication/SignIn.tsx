import React from 'react';

function SignIn() {
  return (
    <div className="flex h-screen">
      <div className="w-2/3 bg-blue-100 flex justify-center items-center">
        <img
          src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K2Hla1RJW2hhJuUGqF1wo3ntGOIwkYPowANn3pKglx5jZVRaSJRrbIpuUaa8kWoClS-20A1rQ0MB3eOCUup64yHkSDbrzp482PArEdNYb~yDvbnSjtZLQORMxREpumXWU1LEmnkYGlxVvHkYJ0fpvD0nONV1lKEPohpSn54FyKdTk0x~5jVU8DwOIQgAqLT-9Ce0nucyChZK2tdSjPYIYmA65bOex9d-WYIOdePt03mxdtFBzyw2oRsQ4pA9j7e-bVSIuQaxufUdbh9Rlz0ylZDssdRq4gZMeqif8X71cpHTb4zHB5OlSrIMqJg1RxlxIxx8mnHFLHYyTHKwBulL3w__"
          alt="Shopping Cart"
          className="max-w-md"
        />
      </div>
      <div className="w-1/3 bg-gray-100 flex flex-col justify-center items-center p-8">
        <div className="text-2xl font-bold mb-2">Log in to Exclusive</div>
        <div className="text-sm text-gray-600 mb-6">Enter your details below</div>
        <input
          type="text"
          placeholder="Email or Phone Number"
          className="border border-gray-300 rounded-md p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-md p-2 mb-6 w-full"
        />
        <div className="flex justify-between w-full">
          <button className="bg-red-500 text-white rounded-md p-2">Log In</button>
          <a href="#" className="text-red-500 text-sm">Forget Password?</a>
        </div>
      </div>
    </div>
  );
}

export default SignIn;