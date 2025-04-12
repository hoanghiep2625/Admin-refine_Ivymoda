// src/axiosInstance.ts
import axios from "axios";
import { TOKEN_KEY } from "./authProvider";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:2625/api",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
