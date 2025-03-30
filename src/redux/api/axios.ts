import axios from "axios";


const api = axios.create({
    baseURL: 'http://localhost:3000/api',  
  });

  // Thêm access token vào mỗi yêu cầu
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm interceptor để xử lý khi access token hết hạn
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      // Nếu bị lỗi 401, thử làm mới token
      const refresh_token = localStorage.getItem("refresh_token");

      if (refresh_token) {
        try {
          // Gửi yêu cầu refresh token
          const response = await api.post('/auth/refresh', { refresh_token });
          const { access_token } = response.data;

          // Lưu trữ access token mới vào localStorage
          localStorage.setItem('access_token', access_token);

          // Cập nhật lại header của yêu cầu gốc
          error.config.headers['Authorization'] = `Bearer ${access_token}`;
          return api(error.config);
        } catch (refreshError) {
          // Nếu không thể refresh token, yêu cầu đăng nhập lại
          console.error("Unable to refresh token", refreshError);
          // Có thể clear localStorage và redirect về trang login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';  // Redirect tới trang login
        }
      }
    }
    return Promise.reject(error);
  }
);


export default api;
