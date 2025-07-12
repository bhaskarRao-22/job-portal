import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import mainBg from "./assets/images/mainBg.jpg";
import { ToastProvider } from "./context/ToastContext";
import MainLandingPage from "./pages/MainLandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SeekerDashboard from "./pages/Dashboard/SeekerDashboard";
import RecruiterDashboard from "./pages/Dashboard/RecruiterDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import PrivateRoute from "./routes/PrivateRoute";
import JobList from "./pages/Jobs/JobList";
import ApplyJob from "./pages/Jobs/ApplyJob";
import Navbar from "./components/Navbar";

function App() {
  const location = useLocation();
  const noPaddingRoutes = ["/", "/login", "/register"];
  const shouldApplyPadding = !noPaddingRoutes.includes(location.pathname);
  return (
    <ToastProvider>
      <Navbar />
      <div
        className={`${shouldApplyPadding ? "pt-16" : ""} min-h-screen `}
        style={{
          backgroundImage: `url(${mainBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard/seeker"
            element={
              <PrivateRoute allowedRoles={["seeker"]}>
                <SeekerDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/recruiter"
            element={
              <PrivateRoute allowedRoles={["recruiter"]}>
                <RecruiterDashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/admin"
            element={
              <PrivateRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />

          <Route path="/jobs" element={<JobList />} />
          <Route
            path="/apply/:id"
            element={
              <PrivateRoute allowedRoles={["seeker"]}>
                <ApplyJob />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </ToastProvider>
  );
}

export default App;
