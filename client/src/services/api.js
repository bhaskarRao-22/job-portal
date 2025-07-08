import axios from "axios";

// console.log("✅ BASE URL:", import.meta.env.VITE_API_BASE_URL);
const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // critical for sending cookies
});

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = (credentials) => API.post("/auth/login", credentials);
// export const fetchJobs = () => API.get("/jobs");

// API.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalReq = error.config;

//     if (
//       error.response?.status === 401 &&
//       !originalReq._retry &&
//       error.response.data.msg === "Token expired"
//     ) {
//       originalReq._retry = true;
//       const { data } = await API.post("/auth/refresh-token");
//       localStorage.setItem("token", data.accessToken);
//       API.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
//       originalReq.headers.Authorization = `Bearer ${data.accessToken}`;
//       return API(originalReq);
//     }
//     return Promise.reject(error);
//   }
// );

