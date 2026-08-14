import axios from 'axios';
import toast from 'react-hot-toast';

const adminApi = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

adminApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log(
      'API Request:',
      `${config.baseURL}${config.url}`
    );

    return config;
  },
  (error) => Promise.reject(error)
);

adminApi.interceptors.response.use(
  (response) => response,

  (error) => {
    console.error(
      'API Error:',
      error.response?.status,
      error.response?.data
    );

    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');

      toast.error('Session expired. Please login again.');

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export default adminApi;