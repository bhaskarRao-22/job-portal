import { useEffect, useState } from "react";
import { getMyApplications } from "../../services/applicationService";

const SeekerDashboard = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplications().then((res) => setApps(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">📄 My Applications</h2>
      {apps.map((a) => (
        <div key={a._id} className="p-4 bg-white shadow rounded mb-4">
          <p>
            <strong>Job:</strong> {a.jobId.title} @ {a.jobId.company}
          </p>
          <p>
            <strong>Status: </strong>
            {a.status}
          </p>
          <a
            href={a.resumeUrl}
            target="_blank"
            className="text-blue-600 ubderline"
          >
            View Resume
          </a>
        </div>
      ))}
    </div>
  );
};

export default SeekerDashboard;
