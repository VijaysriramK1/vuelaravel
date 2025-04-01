import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
    headers: {
      'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('user_auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
});

export default axiosInstance;
