import axios from "axios";

const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: BASE_URL_API,
});

export default api;
