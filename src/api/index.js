import axios from "axios";
// import { getToken } from "./storage";

const BASE_URL = "https://fluid-backend.turguta.com";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.interceptors.request.use((config) => {
  // const token = getToken();
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  config.headers.Authorization = `Bearer ${process.env.STRIP_KEY}`;

  return config;
});

export { BASE_URL };
export default instance;
