import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token_de_acesso")
      : null;
  if (token && config.headers)
    config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default api;
