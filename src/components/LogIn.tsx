import React from 'react';

const LogIn = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex bg-white overflow-hidden w-[1000px] h-[500px]">
        <div className="w-1/2 hidden md:block rounded">
          <img src="/SideImage.svg" alt="Sign Up" className="w-full h-full object-cover rounded" />
        </div>
        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-[36px] mb-1 font-[Inter]">Log in to Exclusive</h2>
          <p className="mb-8 text-gray-600 text-[16px]">Enter your details below</p>
          <input
          type="text"
          placeholder="Email or Phone Number"
          className="w-full mb-8 border-b border-gray-400 text-gray-500 text-[16px] outline-none"
          />
          <input
          type="password"
          placeholder="Password"
          className="w-full mb-8 border-b border-gray-400 text-gray-500 text-[16px] outline-none"
          />

          <button className="w-[143px] bg-red-500 text-white py-2 rounded text-[16px]">Log In</button>          
          <a href="/login" className="ml-16 text-red-500">Forget Password?</a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;