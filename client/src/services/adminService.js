import axios from "axios";
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const getAllUsers = () =>
  axios.get("http://localhost:5000/api/admin/users", config);

export const toggleBanUser = (id) =>
  axios.patch(`http://localhost:5000/api/admin/ban-user/${id}`, {}, config);

export const deleteUser = (id) =>
  axios.delete(`http://localhost:5000/api/admin/user/${id}`, config);
