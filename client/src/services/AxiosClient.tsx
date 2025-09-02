// src/services/api.js
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface CustomAxiosInstance extends AxiosInstance {
  get<T = unknown, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>, credentials?: "include"): Promise<R>;
  post<T = unknown, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  put<T = unknown, R = T, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
  delete<T = unknown, R = T, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
}

// For local development, you can use a .env.local file
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const apiClient: CustomAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

apiClient.interceptors.request.use(
  (config) => {
    if (!config.headers) {
      Object.entries(defaultHeaders).forEach(([key, value]) => {
        config.headers.set(key, value);
      });
    }
    return config;
  },
);

apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    const errorMessage = error.response?.data?.message || error.message;

    const customError = {
      status: error.response?.status,
      message: errorMessage,
      originalError: error,
    };

    return Promise.reject(customError);
  }
);

export default apiClient;