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
// export const createJob = (data) =>
//   axios.post("http://localhost:5000/api/jobs", data, getAuthConfig());
// export const getJobs = () =>
//   axios.get("http://localhost:5000/api/jobs", getAuthConfig());
// export const updateJob = (id, data) =>
//   axios.put(`http://localhost:5000/api/jobs/${id}`, data, getAuthConfig());
// export const deleteJob = (id) =>
//   axios.delete(`http://localhost:5000/api/jobs/${id}`, getAuthConfig());
// export const getJobStats = () =>
//   axios.get("http://localhost:5000/api/jobs/stats", getAuthConfig());
// export const getAllJobs = () =>
//   axios.get("http://localhost:5000/api/jobs/public");

// export const getAllJobsAdmin = () =>
//   axios.get("http://localhost:5000/api/jobs/admin/all", getAuthConfig());

// export const updateJobStatus = (id, status) =>
//   axios.patch(
//     `http://localhost:5000/api/jobs/admin/status/${id}`,
//     { status },
//     getAuthConfig()
//   );

// export const deleteJobAdmin = (id) =>
//   axios.delete(`http://localhost:5000/api/jobs/admin/${id}`, getAuthConfig());


// ######################## For Deployment ########################
export const createJob = (data) =>
  API.post("/jobs", data, getAuthConfig());
export const getJobs = () =>
  API.get("/jobs", getAuthConfig());
export const updateJob = (id, data) =>
  API.put(`/jobs/${id}`, data, getAuthConfig());
export const deleteJob = (id) =>
  API.delete(`/jobs/${id}`, getAuthConfig());
export const getJobStats = () =>
  API.get("/jobs/stats", getAuthConfig());
export const getAllJobs = () =>
  API.get("/jobs/public");

export const getAllJobsAdmin = () =>
  API.get("/jobs/admin/all", getAuthConfig());

export const updateJobStatus = (id, status) =>
  API.patch(
    `/jobs/admin/status/${id}`,
    { status },
    getAuthConfig()
  );

export const deleteJobAdmin = (id) =>
  API.delete(`/jobs/admin/${id}`, getAuthConfig());
