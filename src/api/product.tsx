import axios from "axios";
import { Dataput } from "../redux/type";

export const getProductList = async () => {
    const res = await axios.get(`https://devapi.uniscore.vn/uri/api/products`);
    return res.data;
  };

  export const getProductDetail = async (id: number) => {
    try {
      const res = await axios.get(`https://devapi.uniscore.vn/uri/api/products/${id}`);
      // console.log("API Response:", res.data); // In phản hồi API
      return res.data;
    } catch (error) {
      console.error("Error in getProductDetail:", error);
      throw error;
    }
  };

  export const pushOrder = async (data: any) => {
    try {
      const res = await axios.post(`https://devapi.uniscore.vn/uri/api/orders`, data, {
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

  export const UpdateProduct = async (formData: FormData, username?: string, password?: string) => {
    try {
        const headers: any = {}; // Loại bỏ Content-Type: application/json

        if (username && password) {
            const credentials = `${username}:${password}`;
            const encodedCredentials = btoa(new TextEncoder().encode(credentials).reduce((data, byte) => data + String.fromCharCode(byte), ''));
            headers.Authorization = `Basic ${encodedCredentials}`;
        }

        const res = await axios.put(`https://devapi.uniscore.vn/uri/api/products/3`, formData, { // Gửi formData
            headers: headers,
        });

        console.log("UpdateProduct Response:", res.data); // In phản hồi API
        return res.data;
    } catch (error) {
        console.error("Error in UpdateProduct:", error);
        throw error;
    }
};

export const AllOrder = async () => {
    try {
        const res = await axios.get(`https://devapi.uniscore.vn/uri/api/orders`);
        return res.data;
    } catch (error) {
        console.error("Error in AllOrder:", error);
        throw error;
    }
}
export const ChangeStatus = async (id:number) => {
  try {
      const res = await axios.get(`https://devapi.uniscore.vn/uri/api/orders/${id}`);
      console.log("resdata",res.data)
      return res.data;
  } catch (error) {
      console.error("Error in AllOrder:", error);
      throw error;
  }
}

async function searchProducts(name: string) {
  try {
    const response = await axios.get(
      `https://devapi.uniscore.vn/uri/api/products/search?name=${encodeURIComponent(name)}`
    );
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    return null;
  }
}

