import axios from "axios";
import {LoginData,SignUpData}  from "../redux/type";



export const SignInUser = async (Logindata: LoginData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/login`,
      Logindata
    );
    return res.data;
  };

  export const SignUpUser = async (data: SignUpData) => {
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/register`,
      data
    );
    return res.data;
  };

  export const LogOut = async (Token :string) => {
    console.log(import.meta.env.VITE_BASE_URL);
    const res = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/auth/logout`,
      Token
    );
    return res.data;
  };


