import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import JobForm from "../JobForm";
import { getJobs, deleteJob, createJob, updateJob } from "../../services/jobService";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [jobToEdit, setJobToEdit] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const loadJobs = async () => {
    const res = await getJobs();
    const jobList = Array.isArray(res.data) ? res.data : res.data?.jobs || [];
    setJobs(jobList);
  };

  const handleDelete = async (id) => {
    const confirmMsg = confirm("Are you sure you want to delete this job?");
    if (confirmMsg) {
      await deleteJob(id);
      toast.success("Job deleted!");
      loadJobs();
    }
  };

  const handleEdit = (job) => {
    setJobToEdit(job);
    setShowForm(true);
  };

  const handleSave = async (data) => {
    setIsLoading(true);
    try {
      if (jobToEdit) {
        await updateJob(jobToEdit._id, data);
        toast.success("Job updated!");
      } else {
        await createJob(data);
        toast.success("Job created!");
      }
      setJobToEdit(null);
      setShowForm(false);
      loadJobs();
    } catch (err) {
      toast.error("Error saving job");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-600 mb-4">📁 My Jobs</h2>

      {showForm && (
        <div className="mb-6 bg-white p-4 shadow rounded">
          <JobForm
            onSubmit={handleSave}
            buttonLabel={jobToEdit ? "Update Job" : "Post Job"}
            isLoading={isLoading}
            initialValues={jobToEdit || {}}
          />
          <button
            className="mt-2 text-sm text-gray-500 underline"
            onClick={() => {
              setShowForm(false);
              setJobToEdit(null);
            }}
          >
            Cancel
          </button>
        </div>
      )}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p>
              {job.company} • {job.location}
            </p>
            <p className="text-sm text-gray-600">{job.skills.join(", ")}</p>
            <button
              onClick={() => handleEdit(job)}
              className="mt-2 text-blue-500 hover:underline mr-4"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(job._id)}
              className="mt-2 text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
