import axios from 'axios';

export const BASE_API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
});
