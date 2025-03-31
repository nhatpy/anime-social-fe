import axios from "axios";

export const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.withCredentials = true;
  return config;
});
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);