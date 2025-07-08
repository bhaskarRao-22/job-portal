import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp * 1000;
    if (Date.now() >= exp) {
      localStorage.removeItem("token");
      return false;
    }
    return decoded;
  } catch (err) {
    return false;
  }
};

