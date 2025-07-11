import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // Use Vite proxy for dev
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance; 