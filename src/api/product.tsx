import axios from "axios";


export const getProductList = async () => {
    const res = await axios.get(`https://uritrainer.ddns.net/api/products`);
    return res.data;
  };

  export const getProductDetail = async (id: number) => {
    try {
      const res = await axios.get(`http://localhost:3000/api/products/${id}`);
      // console.log("API Response:", res.data); // In phản hồi API
      return res.data;
    } catch (error) {
      console.error("Error in getProductDetail:", error);
      throw error;
    }
  };

  export const pushOrder = async (data: any) => {
    try {
      const res = await axios.post(`http://localhost:3000/api/orders`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error in pushOrder:", error);
      throw error;
    }
  }