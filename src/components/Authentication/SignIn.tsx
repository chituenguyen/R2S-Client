import { useMutation } from "@tanstack/react-query";
import * as user from "../../api/user";
import {LoginData} from "../../redux/type";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";



function SignIn() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginData>();

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: LoginData) => user.SignInUser(data),
    onSuccess: (data) => {
      toast("Đăng nhập thành công")

    },
    onError: (err: any) => {
      const errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin đăng nhập.';
      toast(errorMessage); // Hiển thị toast lỗi
     
      setError('email', {
        type: 'manual',
        message: errorMessage,
      });
      setError('password', {
        type: 'manual',
        message: errorMessage,
      });
      
    },
  });
  console.log("mutation",mutation)

  const { isSuccess, isPending, data } = mutation;
  
  

  const onSubmit = (data: LoginData) => {
    mutation.mutate(data);
  };
  


  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("access_token", JSON.stringify(data.tokens.accessToken));
      localStorage.setItem("refresh_token", JSON.stringify(data.tokens.refreshToken));
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log(data);
      if (data.user.roles[0] === "ADMIN") {
        navigate('/admin'); // Nếu là admin, chuyển hướng đến trang admin
      }
      else if (data.user.roles[0] === "USER") { 

        // Chuyển hướng sau khi refetch thành công
      navigate('/');
      }

    }
  }, [isSuccess, data]);



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
        <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Email or Phone Number"
          className="border-b border-gray-300 rounded-md p-2 mb-4 w-full"
          {...register('email', { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-b border-gray-300 rounded-md p-2 mb-6 w-full"
          {...register('password', { required: true })}
        />
        <div className="flex justify-between w-full">
          <button type="submit" disabled={isPending}
               className="bg-red-500 text-white rounded-md px-9 py-2" 
               >Log In</button>
          <div className="text-red-500 text-sm flex items-center">Forget Password?</div>
        </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn ;