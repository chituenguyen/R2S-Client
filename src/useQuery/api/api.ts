import axios from "axios";
import { RegisterCredentials, LoginCredentials, LoginResponse, CartItem, Order } from "../user/auth";

export const fetchProducts = async () => {
    const {data} = await axios.get("https://devapi.uniscore.vn/uri/api/products")
    return data.data
}

export const fetchProductDetail = async (id: number) =>{
    const {data} = await axios.get(`https://devapi.uniscore.vn/uri/api/products/${id}`)
    return data
}

export const registerUser = async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await axios.post<AuthResponse>(`https://devapi.uniscore.vn/uri/api/auth/register`, credentials);
    return response.data;
  };
  
export const loginUser = async (credential: LoginCredentials) => {
    const response = await axios.post(`https://devapi.uniscore.vn/uri/api/auth/login`, credential)
    return response.data
}

export const createOrders = async (orderData: Order) => {
    try {
        const authTokens = JSON.parse(localStorage.getItem("token") || "{}");
        if (!authTokens.accessToken) {
            console.error("⚠️ Không tìm thấy access token.");
            return null;
        }
        const response = await axios.post(
            `https://devapi.uniscore.vn/uri/api/orders`, 
            orderData,
            {
                headers: {
                    "Authorization": `Bearer ${authTokens.accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch(error) {
        if (error.response) {
            console.error(`❌ API lỗi ${error.response.status}:`, error.response.data);
            console.log("Request headers:", error.config?.headers);
        } else {
            console.error("❌ API lỗi:", error.message);
        }
        throw error;
    }
}

export const CityPick = async() => {
    const response = await axios.get('https://provinces.open-api.vn/api/')
    return response.data
}

export const updateProduct = async ({ id, formData }) => {
    try {
        const response = await axios.put(
            `https://devapi.uniscore.vn/uri/api/products/${id}`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("❌ API lỗi 400:", error.response?.data || error.message);
        throw error;
    }
};

export const createProduct = async({formData}) => {
    try {
        const response = await axios.post(
            "https://devapi.uniscore.vn/uri/api/products",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi API:", error.response?.data || error.message);
        throw error;
    }
}

export const listOrder = async () => {
    try {
        const authTokens = JSON.parse(localStorage.getItem("token") || "{}");

        const response = await axios.get("https://devapi.uniscore.vn/uri/api/orders", {
            headers: {
                Authorization: `Bearer ${authTokens.accessToken}`,
            },
        });
        

        return response.data;
    } catch (error) {
        return null;
    }
};

export const editStatus = async({id, newStatus}) => {
    const response = await axios.put(`https://devapi.uniscore.vn/uri/api/orders/${id}`, 
        {status: newStatus},
        {
            headers:{
                "Content-Type":"application/json",
            }
        }
    )
    return response.data
}


export const searchName = async ({ name }) => {
  try {
    const response = await axios.get(`https://devapi.uniscore.vn/uri/api/products/search?name=${name}`);
    return response.data;
  } catch (error) {
    return [];
  }
};


