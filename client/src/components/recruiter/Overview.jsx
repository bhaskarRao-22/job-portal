import { useEffect, useState } from "react";
import { getJobs, getJobStats } from "../../services/jobService";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from "recharts";

const Overview = () => {
  const [jobs, setJobs] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await getJobs();
      setJobs(Array.isArray(res.data) ? res.data : res.data?.jobs || []);

      const statsRes = await getJobStats();
      setStats(statsRes.data || []);
    })();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold text-blue-600 mb-4">📊 Jobs Posted Per Month</h2>
      <div className="w-full h-64 bg-white p-4 rounded shadow mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="jobs" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2 className="text-xl font-bold text-blue-600 mb-4">📁 My Jobs</h2>
      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job._id} className="p-4 bg-white shadow rounded">
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p>{job.company} • {job.location}</p>
            <p className="text-sm text-gray-600">{job.skills.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Overview;
