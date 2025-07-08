import { useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { applyToJob, uploadResume } from "../../services/applicationService";
import LoadingButton from "../../components/LoadingButton";
import { useToast } from "../../context/ToastContext";

const ApplyJob = () => {
  const { id: jobId } = useParams();
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!file) return showToast("Please upload a resume", "error");
    if (!file) return toast.error("Please upload a resume");
    try {
      setIsLoading(true);
      const resumeUrl = await uploadResume(file);
      await applyToJob({ jobId, resumeUrl });

      setTimeout(() => {
        setIsLoading(false);
        // showToast("Application submitted!", "success");
        toast.success("Application submitted!");
      }, 2000);
    } catch (err) {
      // showToast(err.response?.data?.msg || "Error applying", "error");
      toast.error(err.response?.data?.msg || "Error applying");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Apply for Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFile}
          className="w-full border px-3 py-2 rounded"
        />
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          loadingText="Uploading..."
        >
          {isLoading ? "Uploading..." : "Submit Application"}
        </LoadingButton>
      </form>
    </div>
  );
};

export default ApplyJob;
