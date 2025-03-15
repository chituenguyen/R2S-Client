import axios from 'axios';

<<<<<<< Updated upstream
=======
// Nơi mà chúng ta định nghĩa rằng source gọi đến bao nhiêu service. 
// const api = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
>>>>>>> Stashed changes
const api = axios.create({
  baseURL: 'https://api.kungfutech.edu.vn/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

<<<<<<< Updated upstream
export default api;
=======
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

export default api; 
>>>>>>> Stashed changes
