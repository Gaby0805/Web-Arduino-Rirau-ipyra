import axios from "axios";
import Cookies from "js-cookie";  // ✅ importar js-cookie
import dotenv from "dotenv";
dotenv.config();

const api = axios.create({
  baseURL: process.env.ROUTE ,
  withCredentials: true, // envia cookies automaticamente
});

// Interceptor para enviar token via Authorization header
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token"); // ou use cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
