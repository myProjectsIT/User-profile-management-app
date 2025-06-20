import axios from 'axios';

const apiKey = import.meta.env.VITE_API_KEY; 

const api = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': apiKey, 
  },
});

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (userData: any) => api.post('/register', userData);
export const loginUser = (userData: any) => api.post('/login', userData);
export default api;

