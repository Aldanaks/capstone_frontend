import axios from "axios";
import { getToken } from "./storage";

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
