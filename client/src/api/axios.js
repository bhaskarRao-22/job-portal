import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // critical for cookie to send refreshToken
});

// Intercept all responses
api.interceptors.response.use(
  (response) => response, // success → return as-is
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response.data.msg === "Token expired"
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh-token");

        const newAccessToken = res.data.accessToken;
        localStorage.setItem("token", newAccessToken);

        // Update token in header
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
