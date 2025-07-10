// components/admin/JobList.jsx
import { useEffect, useState } from "react";
import { getAllJobsAdmin, updateJobStatus, deleteJobAdmin } from "../../services/jobService";
import toast from "react-hot-toast";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { downloadCSV } from "../../services/adminService";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [action, setAction] = useState("");

  const loadJobs = async () => {
    const res = await getAllJobsAdmin();
    setJobs(res.data);
  };

  const handleAction = async (id, type) => {
    setLoadingId(id);
    setAction(type);
    if (type === "delete") {
      await deleteJobAdmin(id);
      toast.error("Job deleted");
    } else {
      await updateJobStatus(id, type);
      toast.success(`Job ${type}`);
    }
    setLoadingId(null);
    setAction("");
    loadJobs();
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">📦 Job Listings</h2>
        <button
          onClick={() => downloadCSV("jobs")}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <ArrowDownTrayIcon className="w-5 h-5" /> Export Jobs
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="rounded-2xl border border-gray-200  p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 
          bg-light-900/80 backdrop-blur-sm shadow-md 
          ">
            <h3 className="font-bold text-lg">{job.title}</h3>
            <p className="text-sm text-gray-500">{job.company} – {job.location}</p>
            <p className="text-sm">Recruiter: {job.recruiterId?.email}</p>
            <p className="mt-2 text-xs font-medium">
              Status: <span className={`px-2 py-1 rounded-md ring-inset ring-1 ${
                job.status === "approved" ? "bg-green-50 text-green-700 ring-green-600/20" :
                job.status === "rejected" ? "bg-yellow-50 text-yellow-700 ring-yellow-600/20" : "bg-gray-50 text-gray-700 ring-gray-600/20"
              }`}>{job.status}</span>
            </p>

            <div className="mt-4 grid grid-flow-col justify-items-center text-sm">
              <button
                onClick={() => handleAction(job._id, "approved")}
                disabled={loadingId === job._id && action === "approved"}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                {loadingId === job._id && action === "approved" ? "Approving..." : "Approve"}
              </button>
              <button
                onClick={() => handleAction(job._id, "rejected")}
                disabled={loadingId === job._id && action === "rejected"}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                {loadingId === job._id && action === "rejected" ? "Rejecting..." : "Reject"}
              </button>
              <button
                onClick={() => handleAction(job._id, "delete")}
                disabled={loadingId === job._id && action === "delete"}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                {loadingId === job._id && action === "delete" ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
