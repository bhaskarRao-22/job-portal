import JobForm from "../JobForm";
import { useState } from "react";
import toast from "react-hot-toast";
import { createJob } from "../../services/jobService";

const PostJobForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async (data) => {
    setIsLoading(true);
    try {
      await createJob(data);
      toast.success("Job Posted!");
    } catch (err) {
      toast.error("Failed to post job");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-600 mb-4">Post a New Job</h2>
      <JobForm onSubmit={handleCreate} buttonLabel="Post Job" isLoading={isLoading} />
    </div>
  );
};

export default PostJobForm;
