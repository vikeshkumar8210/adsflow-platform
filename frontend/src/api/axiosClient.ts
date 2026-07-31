import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor: Har API request me JWT token auto-inject karta hai
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('adsflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});