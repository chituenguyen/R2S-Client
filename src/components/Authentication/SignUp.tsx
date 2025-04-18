import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "@tanstack/react-query";
import * as user from "../../api/user";
import {SignUpData} from "../../redux/type";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";
import { useForm } from 'react-hook-form';
import { useEffect } from "react";

function SignUp(){
  const { toast } = useToast();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<SignUpData>();


  const password = watch('password');
  console.log("password",password)
  

  const mutation = useMutation({
      mutationKey: ['signup'],
      mutationFn: (data: SignUpData) => user.SignUpUser(data),
      onSuccess: (data) => {
        // localStorage.setItem('access_token', JSON.stringify(data?.tokens.accessToken));
        // localStorage.setItem('refresh_token', JSON.stringify(data?.tokens.refreshToken));
        toast("Đăng kí thành công")
        navigate('/signin');
      },
      onError: (err: any) => {
          const errorMessage =
            err?.response?.data?.message ||
            'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.';
          toast(errorMessage);
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
  
    const onSubmit = (data: SignUpData) => {
      mutation.mutate(data);
    };
    
    useEffect(() => {
        if (isSuccess) {
          localStorage.setItem("access_token", JSON.stringify(data.tokens.accessToken));
          localStorage.setItem("refresh_token", JSON.stringify(data.tokens.refreshToken));
          console.log(data);
          navigate("/");
        }
      }, [isSuccess, data]);
  
  return(
    <div className="flex h-screen">
    <div className="w-2/3 bg-white flex justify-center items-center">
    <img src="/assets/ShoppingCart.jpg"
     alt="Shopping Cart" className="max-w-full" />
  </div>
  <div className="w-1/3 bg-white flex flex-col justify-center p-20">
    <div className="text-4xl font-bold mb-2">Create an account</div>
    <div className="text-sm text-gray-600 mb-6">Enter your details below</div>
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <label>
        <input type="text" placeholder="Name" 
            className="border-b border-gray-300 rounded-md p-2 mb-4 w-full" 
            {...register('ten', { required: 'Name required' })}
        />
          {errors.ten && <span>{errors.ten.message}</span>}
      </label> */}
      <label>
        <input type="text" placeholder="Email or Phone Number" 
          className="border-b border-gray-300 rounded-md p-2 mb-4 w-full" 
          {...register('email', {
            required: 'Email/Phone number required',
          })}
        />
          {errors.email && <span>{errors.email.message}</span>}
      </label>
      <label>
        <input type="password" placeholder="Password" 
        className="border-b border-gray-300 rounded-md p-2 mb-6 w-full" 
        {...register('password', { required: 'Password required' })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </label>
      <button className="bg-red-500 text-white rounded-md p-2 mb-4 w-full"
      type="submit" disabled={isPending}>
        Create Account
        </button>
    </form>
    <button className="border border-gray-300 rounded-md p-2 mb-6 w-full flex justify-center items-center space-x-2">
      <FcGoogle />
      <div>Sign up with Google</div>
    </button>
    <div className="text-sm text-gray-600 flex items-center justify-center">
      Already have account? <Link to="/signin" className=" ml-5 underline">Log in</Link>
    </div>
  </div>
</div>
  )
}export default SignUp;
