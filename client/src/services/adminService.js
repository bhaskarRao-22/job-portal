import axios from "axios";
import { API } from "./api"
const token = localStorage.getItem("token");
const config = {
  headers: { Authorization: `Bearer ${token}` },
};

// ######################## For Developement ########################
// export const getAllUsers = () =>
//   axios.get("http://localhost:5000/api/admin/users", config);

// export const toggleBanUser = (id) =>
//   axios.patch(`http://localhost:5000/api/admin/ban-user/${id}`, {}, config);

// export const deleteUser = (id) =>
//   axios.delete(`http://localhost:5000/api/admin/user/${id}`, config);


// ######################## For Deployment ########################
export const getAllUsers = () =>
  API.get("/admin/users", config);

export const toggleBanUser = (id) =>
  API.patch(`/admin/ban-user/${id}`, {}, config);

export const deleteUser = (id) =>
  API.delete(`/admin/user/${id}`, config);

