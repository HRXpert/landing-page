// utils/axiosInstance.ts
import axios from 'axios';
import { AUTH_SERVER_URL } from '../endpoints';

const axiosInstance = axios.create({
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // const hasRefreshToken = document.cookie.includes('refresh_token');
      // if (!hasRefreshToken) {
      //   // No refresh token, logout user or redirect to login
      //   window.location.href = '/signin';
      //   return Promise.reject(error);
      // }

      // Call refresh endpoint
      await axios.post(
        `${AUTH_SERVER_URL}/auth/refresh`,
        {},
        { withCredentials: true } 
      );

      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;