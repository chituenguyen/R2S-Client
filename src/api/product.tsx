import axios from "axios";


export const getProductList = async () => {
    const res = await axios.get(`${process.env.DOMAIN_API}/products`);
    return res.data;
  };

  export const getProductDetail = async (id: number) => {
    try {
      const res = await axios.get(`${process.env.DOMAIN_API}/products/${id}`);
      // console.log("API Response:", res.data); // In phản hồi API
      return res.data;
    } catch (error) {
      console.error("Error in getProductDetail:", error);
      throw error;
    }
  };

  export const pushOrder = async (data: any) => {
    try {
      const res = await axios.post(`${process.env.DOMAIN_API}/orders`, data, {
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