import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.kungfutech.edu.vn/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;