import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import LoginIcon from '@mui/icons-material/Login';




function Login() {
   const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Xử lý dữ liệu đăng nhập ở đây
  };

  // const handleEmailChange = (e) => {
  //   const newEmail = e.target.value;
  //   setEmail(newEmail);

  //   // Kiểm tra độ dài email
  //   const isLengthValid = newEmail.length > 10;

  //   // Kiểm tra định dạng email cơ bản (ví dụ: có chứa '@')
  //   const isFormatValid = newEmail.includes('@');

  //   // Cập nhật trạng thái isValid
  //   setIsValid(isLengthValid && isFormatValid);

  //   console.log(email);
  // };
  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  //   console.log(password);

  // };

  return (
      <div className="w-full h-screen flex justify-center align-center bg-pink-500">
        
        <div className="w-8/12 mt-12 h-[700px] rounded-lg bg-white relative text-center">
            <div >
            <p className="text-2xl tracking-wide text-primary-dark-blue mt-36">
            To login as admin, please use the credentials below:
            </p>
            <p className="text-2xl  text-[#333] mt-12"><text className='font-bold'> Email :</text> abc@gmail.com</p>
            <p className="text-2xl  text-[#333] "><text className='font-bold'> Password:</text> 123456</p>
            <form className="w-10/12 " onSubmit={handleSubmit(onSubmit)} >
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
                {...register('email', { required: 'Vui lòng nhập email',pattern: {
                  value: /@/,
                  message: 'Email phải chứa ký tự "@"',
                }, })}
                placeholder="Email" 
                className="w-full h-16 col-span-2 text-2xl px-10 placeholder-stone-600 text-black border border-gray-300 rounded-full bg-stone-400 "
              />
              {errors.email && <p className='text-red-500'>{errors.email.message}</p>}         
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
                {...register('password', { required: 'Vui lòng nhập mật khẩu',minLength: {
                  value: 6,
                  message: 'Mật khẩu phải có ít nhất 6 ký tự',}   })}
                placeholder="Mật khẩu"
                className="w-full h-16 col-span-2 px-10 mt-2 text-2xl border text-black  placeholder-stone-600  border-gray-300 rounded-full bg-stone-400 "
              />
              {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
            </div>
            <div className=" grid grid-cols-3 gap-4">
              <div></div>
            <button type='submit' className='col-span-2 h-16  rounded-full text-white text-2xl hover:bg-slate-700 bg-lime-400'>
             <LoginIcon/> Đăng nhập
            </button>
            </div>
          </form>
        </div>
        </div>
        </div>
  );
}

export default Login;

