import axios from "axios";
import LoginData from "../redux/type"

export const SignInUser = async (Logindata: LoginData) => {
    const res = await axios.post(
      'http://localhost:3000/api/auth/login',
      Logindata
    );
    return res.data;
  };