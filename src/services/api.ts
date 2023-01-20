import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL_API,
});

api.interceptors.request.use(async (config) => {
  const token = Cookies.get("Exsto_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
