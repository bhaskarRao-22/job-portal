import axios from "axios";

// console.log("✅ BASE URL:", import.meta.env.VITE_API_BASE_URL);
export const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // critical for sending cookies
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);
// export const fetchJobs = () => API.get("/jobs");