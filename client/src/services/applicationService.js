import axios from "axios";
import { API } from "./api";

// const token = localStorage.getItem("token");
// const config = token
//   ? {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   : {};

  const getAuthConfig = () => {
  const token = localStorage.getItem("token");
  return token
    ? {
        headers: { Authorization: `Bearer ${token}` },
      }
    : {};
};

// ######################## For Developement ########################
// export const applyToJob = (data) =>
//   axios.post(`http://localhost:5000/api/applications`, data, getAuthConfig());

// export const getMyApplications = () =>
//   axios.get(`http://localhost:5000/api/applications`, getAuthConfig());


// ######################## For Deployment ########################
export const applyToJob = (data) =>
  API.post(`/applications`, data, getAuthConfig());

export const getMyApplications = () =>
  API.get(`/applications`, getAuthConfig());

export const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "resume_upload"); // replace this
  const res = await axios.post(
    "https://api.cloudinary.com/v1_1/dvofrvabg/upload", // replace this
    formData
  );
  return res.data.secure_url;
};

