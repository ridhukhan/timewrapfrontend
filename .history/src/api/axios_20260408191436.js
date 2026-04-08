import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.spaytimes.xyz",
  withCredentials: true,
});

export default axiosInstance;