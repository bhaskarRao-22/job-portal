import { useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { applyToJob, uploadResume } from "../../services/applicationService";
import LoadingButton from "../../components/LoadingButton";

const ApplyJob = () => {
  const { id: jobId } = useParams();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return toast.error("Please upload a resume");
    try {
      setIsLoading(true);
      const resumeUrl = await uploadResume(file);
      await applyToJob({ jobId, resumeUrl });

      setTimeout(() => {
        setIsLoading(false);
        toast.success("Application submitted!");
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.msg || "Error applying");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-light-900/80 shadow-lg rounded-2xl backdrop-blur-sm">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Apply for Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="w-full border px-4 py-2 rounded-lg bg-white"
        />
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          loadingText="Uploading..."
          className="w-full bg-blue-600 text-white"
        >
          {isLoading ? "Uploading..." : "Submit Application"}
        </LoadingButton>
      </form>
    </div>
  );
};

export default ApplyJob;
