import axios from 'axios';

// Nơi mà chúng ta định nghĩa rằng source gọi đến bao nhiêu service. 
const api = axios.create({
  baseURL: 'https://api.kungfutech.edu.vn/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 