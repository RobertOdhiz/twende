import axios from "axios";

const baseURL = "https://twende-server.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (typeof error.response === "undefined") {
      alert("A server/network error occurred. Check CORS settings.");
      return Promise.reject(error);
    }

    if (error.response.status === 401 && originalRequest.url !== baseURL + "login/") {
      localStorage.removeItem("access_token");
      window.location.href = "/login/";
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
