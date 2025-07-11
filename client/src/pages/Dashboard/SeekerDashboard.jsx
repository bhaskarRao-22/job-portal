import { useEffect, useState } from "react";
import { getMyApplications } from "../../services/applicationService";

const SeekerDashboard = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getMyApplications().then((res) => setApps(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        📄 My Applications
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {apps.map((a) => (
          <div key={a._id} className="bg-light-900/80 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
            <p className="text-lg font-semibold">{a.jobId.title}</p>
            <p className="text-sm text-gray-500">{a.jobId.company}</p>
            <p className="text-sm text-gray-500">Status: {a.status}</p>
            <a
              href={a.resumeUrl}
              target="_blank"
              className="text-blue-600 hover:underline mt-4 inline-block"
            >
              View Resume
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeekerDashboard;
