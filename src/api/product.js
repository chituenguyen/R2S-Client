import axios from "axios";


export const getProductList = async () => {
    const res = await axios.get(`http://localhost:3000/api/products`);
    return res.data;
  };