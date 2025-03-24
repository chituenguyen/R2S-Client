import axios from "axios";
import {LoginData,SignUpData}  from "../redux/type";



export const SignInUser = async (Logindata: LoginData) => {
    const res = await axios.post(
      'https://uritrainer.ddns.net/api/auth/login',
      Logindata
    );
    return res.data;
  };

  export const SignUpUser = async (data: SignUpData) => {
    const res = await axios.post(
      'https://uritrainer.ddns.net/api/auth/register',
      data
    );
    return res.data;
  };

  export const LogOut = async (Token :string) => {
    const res = await axios.post(
      'https://uritrainer.ddns.net/api/auth/logout',
      Token
    );
    return res.data;
  };

