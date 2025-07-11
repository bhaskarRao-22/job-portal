import axios from "axios";
import { API } from "./api";
// const token = localStorage.getItem("token");
// const config = {
//   headers: { Authorization: `Bearer ${token}` },
// };

const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: { Authorization: `Bearer ${token}` },
  };
};
// ######################## For Developement ########################
// export const getAllUsers = () =>
//   axios.get("http://localhost:5000/api/admin/users", config);

// export const toggleBanUser = (id) =>
//   axios.patch(`http://localhost:5000/api/admin/ban-user/${id}`, {}, config);

// export const deleteUser = (id) =>
//   axios.delete(`http://localhost:5000/api/admin/user/${id}`, config);

// ######################## For Deployment ########################
export const getAllUsers = () => API.get("/admin/users", getAuthConfig());

export const toggleBanUser = (id) =>
  API.patch(`/admin/ban-user/${id}`, {}, getAuthConfig());

export const deleteUser = (id) =>
  API.delete(`/admin/user/${id}`, getAuthConfig());

export const downloadCSV = async (type) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/admin/export-${type}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${type}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
};
