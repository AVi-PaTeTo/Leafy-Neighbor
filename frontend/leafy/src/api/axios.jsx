import axios from "axios";

const hostname = window.location.hostname;
const isLocalhost =
  hostname === "localhost" ||
  hostname === "127.0.0.1" ||
  hostname === "0.0.0.0";

const baseURL = isLocalhost
  ? import.meta.env.VITE_API_URL_LOCAL + "/api"
  : import.meta.env.VITE_API_URL + "/api";

// console.log("🌐 Using API base URL:", baseURL);

const API = axios.create({ baseURL });

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
