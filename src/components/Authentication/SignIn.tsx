import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from 'react';
import * as user from "../../api/user";
import LoginData from "../../redux/type";
import { useNavigate } from "react-router-dom";


function SignIn() {
  
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();



  const mutation = useMutation({
    
      mutationKey: ['mutation'],
      mutationFn: (data: LoginData) => user.SignInUser(data),
      onSuccess: (data) => {
        // Xử lý thành công (ví dụ: lưu token, chuyển hướng)
        console.log('Login successful', data);
      },
      onError: (error) => {
        // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
        console.error('Login failed', error);
    },
  })
  const  { data, isSuccess, isPending } = mutation;
  useEffect(() =>{
    if (isSuccess) {
      localStorage.setItem("access_token", JSON.stringify(data?.tokens.accessToken));
      localStorage.setItem("refresh_token", JSON.stringify(data?.tokens.refreshToken));
      console.log("accessToken",data?.tokens.accessToken);
      console.log("refreshToken",data?.tokens.refreshToken);
      navigate("/");

    }
  })

  console.log(identifier,password)
  

  const handleIdentifierChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIdentifier(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  


  const handleLogin = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // Kiểm tra thông tin đăng nhập
    if (!identifier.trim() || !password.trim()) {
        setError('Vui lòng nhập email/số điện thoại và mật khẩu.');
        return;
    }

    // Kiểm tra định dạng (ví dụ: email)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Ví dụ regex email
    if (identifier.includes('@') && !emailRegex.test(identifier)) {
        setError('Email không đúng định dạng.');
        return;
    }

    // Gọi mutation nếu không có lỗi
    mutation.mutate({ identifier, password }, {
        onError: (err: any) => {
            setError(err?.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.');
        }
      });
    };

    console.log("mution:",mutation.data)

  return (
    <div className="flex h-screen">
      <div className="w-2/3 bg-white flex justify-center items-center">
        <img
          src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1742774400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=K2Hla1RJW2hhJuUGqF1wo3ntGOIwkYPowANn3pKglx5jZVRaSJRrbIpuUaa8kWoClS-20A1rQ0MB3eOCUup64yHkSDbrzp482PArEdNYb~yDvbnSjtZLQORMxREpumXWU1LEmnkYGlxVvHkYJ0fpvD0nONV1lKEPohpSn54FyKdTk0x~5jVU8DwOIQgAqLT-9Ce0nucyChZK2tdSjPYIYmA65bOex9d-WYIOdePt03mxdtFBzyw2oRsQ4pA9j7e-bVSIuQaxufUdbh9Rlz0ylZDssdRq4gZMeqif8X71cpHTb4zHB5OlSrIMqJg1RxlxIxx8mnHFLHYyTHKwBulL3w__"
          alt="Shopping Cart"
          className="max-w-full max-h-full "
        />
      </div>
      <div className="w-1/3 bg-white flex flex-col justify-center p-20">
        <div className="text-2xl font-bold mb-2">Log in to Exclusive</div>
        <div className="text-sm text-gray-600 mb-6">Enter your details below</div>
        <input
          type="text"
          id="identifier"
          name='identifier'
          placeholder="Email or Phone Number"
          onChange={handleIdentifierChange}
          className="border-b border-gray-300 rounded-md p-2 mb-4 w-full"
        />
        <input
          type="password"
          id='password'
          name='password'
          placeholder="Password"
          onChange={handlePasswordChange}
          className="border-b border-gray-300 rounded-md p-2 mb-6 w-full"
        />
        <div className="flex justify-between w-full">
          <button type='submit'
               className="bg-red-500 text-white rounded-md px-9 py-2" 
               onClick={handleLogin}
               >Log In</button>
          <div className="text-red-500 text-sm flex items-center">Forget Password?</div>
        </div>
      </div>
    </div>
  );
}

export default SignIn ;