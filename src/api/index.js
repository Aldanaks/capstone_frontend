import axios from "axios";
import { getToken } from "./storage";


const BASE_URL= "http://localhost:8000";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export {BASE_URL}
export default instance

