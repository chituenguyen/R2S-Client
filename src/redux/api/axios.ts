import axios from 'axios';
// Nơi mà chúng ta định nghĩa rằng source gọi đến bao nhiêu service. 
// const api = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
export const getuser = async () => {
  const res = await axios.get(
    `http://localhost:3000/users`
  );
  return res.data;
};

export const getProductList = async () => {
  const res = await axios.get(`http://localhost:3000/api/products`);
  return res.data;
};

export const getProductById = async (productId: number) => {
  return axios.get(`/products/${productId}`);
};
