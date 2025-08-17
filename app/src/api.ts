import axios from "axios";
import Cookies from "js-cookie";  // ✅ importar js-cookie

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
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
