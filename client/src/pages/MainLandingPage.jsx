// JOB-PORTAL/client/src/pages/MainLandingPage.jsx
import { Link } from "react-router-dom";

const MainLandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to JobPortal</h1>
      <p className="text-lg md:text-xl mb-8 max-w-2xl">
        Connecting job seekers with recruiters and admin tools to manage it all.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-200 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-white text-purple-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-200 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default MainLandingPage;
