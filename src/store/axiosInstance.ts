import axios from "axios";

// Create Axios instance with authentication cookies
const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // Change this when backend is ready
  withCredentials: true, // Sends cookies with requests
});

export default axiosInstance;
