import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_URL_BASE_API;

axios.interceptors.request.use(
  (config) => {
    const tokenSecurity = window.localStorage.getItem("token");
    if (tokenSecurity) {
      config.headers.Authorization = "Bearer " + tokenSecurity;
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const genericRequest = {
  get: (url) => axios.get(url),
  post: (url, body) => axios.post(url, body),
  put: (url, body) => axios.put(url, body),
  delete: (url) => axios.delete(url),
};

export default genericRequest;
