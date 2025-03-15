import axios from 'axios';

<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
=======
>>>>>>> Stashed changes
// Nơi mà chúng ta định nghĩa rằng source gọi đến bao nhiêu service. 
// const api = axios.create({
//   baseURL: 'https://jsonplaceholder.typicode.com',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
const api = axios.create({
  baseURL: 'https://api.kungfutech.edu.vn/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

<<<<<<< Updated upstream
<<<<<<< Updated upstream
export default api;
=======
=======
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
export default api; 
>>>>>>> Stashed changes
=======
export default api; 
>>>>>>> Stashed changes
