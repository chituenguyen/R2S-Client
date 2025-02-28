import React from 'react'



function Login() {
  return (
      <div className="w-full h-screen flex justify-center align-center bg-pink-500">
        
        <div className="w-8/12 mt-12 h-[700px] rounded-lg bg-white relative text-center">
            <div >
            <p className="text-2xl tracking-wide text-primary-dark-blue mt-36">
            To login as admin, please use the credentials below:
            </p>
            <p className="text-2xl  text-[#333] mt-12"><text className='font-bold'> Email :</text> abc@gmail.com</p>
            <p className="text-2xl  text-[#333] "><text className='font-bold'> Password:</text> 123456</p>
            <form className="w-10/12 " >
            <div className=" grid grid-cols-3 gap-4">
              <label
                htmlFor="email"
                className="block text-2xl"
              >
                <p>Email</p>
                <p className='mr-3'>Andress</p>
              </label>
              <input  
                type="text"
                id="email"
                name="email"
                placeholder="Email" 
                className="w-full h-16 col-span-2 text-2xl px-10 placeholder-stone-600 text-black border border-gray-300 rounded-full bg-stone-400 "
              />
              
            </div>
            <div className="mb-6 grid grid-cols-3 gap-4">
              <label
                htmlFor="password"
                className="block text-2xl mt-6"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Mật khẩu"
                className="w-full h-16 col-span-2 px-10 mt-2 text-2xl border text-black  placeholder-stone-600  border-gray-300 rounded-full bg-stone-400 "
              />
            </div>
            <div className=" grid grid-cols-3 gap-4">
              <div></div>
            <button className='col-span-2 h-16 bg-slate-600 rounded-full text-white text-2xl hover:bg-slate-700 bg-lime-400'>
              Đăng nhập
            </button>
            </div>
          </form>
        </div>
        </div>
        </div>
  );
}

export default Login;

