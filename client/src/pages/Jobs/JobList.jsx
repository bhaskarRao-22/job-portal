import { useEffect, useState } from "react";
import { getAllJobs } from "../../services/jobService";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");

  useEffect(() => {
    // const fetchJobs = async () => {
    //   try {
    //     const res = await getAllJobs();
    //     setJobs(res.data.jobs);
    //   } catch (error) {
    //     console.error("Error fetching jobs:", error);
    //   }
    // };
    // fetchJobs();
    getAllJobs().then((res) => {
      setJobs(res.data);
      setFilteredJobs(res.data);
    });
  }, []);

  useEffect(() => {
    let result = jobs;

    if (search) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (location) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (skill) {
      result = result.filter((job) =>
        job.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
      );
    }
    setFilteredJobs(result);
  }, [search, location, skill, jobs]);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        🧑‍💼 Browse Jobs
      </h2>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full bg-light-900/80 backdrop-blur-sm"
        />
        <input
          type="text"
          placeholder="Filter by location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full bg-light-900/80 backdrop-blur-sm"
        />
        <input
          type="text"
          placeholder="Filter by skill..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="border px-4 py-2 rounded-lg w-full bg-light-900/80 backdrop-blur-sm"
        />
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job._id}
            className="bg-light-900/80 p-6 rounded-2xl shadow-lg backdrop-blur-sm"
          >
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p>
              {job.company} | {job.location}
            </p>
            <p className="text-sm">{job.skills.join(", ")}</p>
            <Link
              to={`/apply/${job._id}`}
              className="text-blue-600 hover-underline mt-2 inline-block"
            >
              Apply
            </Link>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <p className="text-gray-500 text-center mt-10">
          🚫 No jobs found. Try another filter.
        </p>
      )}
    </div>
  );
};

export default JobList;
