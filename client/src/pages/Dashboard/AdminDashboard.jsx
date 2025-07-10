// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import {
//   getAllJobsAdmin,
//   updateJobStatus,
//   deleteJobAdmin,
// } from "../../services/jobService";
// import { useToast } from "../../context/ToastContext";
// import {
//   getAllUsers,
//   toggleBanUser,
//   deleteUser,
//   downloadCSV,
// } from "../../services/adminService";

// const AdminDashboard = () => {
//   const [users, setUsers] = useState([]);
//   const [jobs, setJobs] = useState([]);
//   const { showToast } = useToast();
//   const [isLoading, setIsLoading] = useState(null);
//   const [loadingAction, setLoadingAction] = useState(null);

//   const loadUsers = async () => {
//     const res = await getAllUsers();
//     setUsers(res.data);
//   };

//   const loadJobs = async () => {
//     const res = await getAllJobsAdmin();
//     setJobs(res.data);
//   };

//   const handleStatus = async (id, status) => {
//     setIsLoading(id);
//     setLoadingAction(status);
//     await updateJobStatus(id, status);
//     setTimeout(() => {
//       setIsLoading(null);
//       setLoadingAction(null);
//       loadJobs();
//       // showToast(`Job ${status}!`, "success");
//       toast.success(`Job ${status}!`);
//     }, 2000);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure?")) {
//       setIsLoading(id);
//       setLoadingAction("delete");
//       await deleteJobAdmin(id);
//       setTimeout(() => {
//         setIsLoading(null);
//         setLoadingAction(null);
//         loadJobs();
//         // showToast(`Job successfully deleted!`, "error");
//         toast.error(`Job successfully deleted!`);
//       }, 2000);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//     loadJobs();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">🧑‍⚖️ Admin – Manage Job Posts</h2>
//       {jobs.map((job) => (
//         <div key={job._id} className="bg-white p-4 shadow rounded mb-4">
//           <h3 className="text-lg font-bold">{job.title}</h3>
//           <p className="text-sm text-gray-600">
//             {job.company} • {job.location} | Posted by: {job.recruiterId?.email}
//           </p>
//           <p>
//             Status: <span className="font-medium">{job.status}</span>
//           </p>
//           <div className="mt-2 flex gap-4">
//             <button
//               onClick={() => handleStatus(job._id, "approved")}
//               disabled={isLoading === job._id && loadingAction === "approved"}
//               className={`px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded ${
//                 isLoading === job._id && loadingAction === "approved"
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:bg-green-700"
//               }`}
//             >
//               {isLoading === job._id && loadingAction === "approved"
//                 ? "Approving..."
//                 : "Approve"}
//             </button>

//             <button
//               onClick={() => handleStatus(job._id, "rejected")}
//               disabled={isLoading === job._id && loadingAction === "rejected"}
//               className={`px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded ${
//                 isLoading === job._id && loadingAction === "rejected"
//                   ? "opacity-50 cursor-not-allowed"
//                   : "hover:bg-green-700"
//               }`}
//             >
//               {isLoading === job._id && loadingAction === "rejected"
//                 ? "Rejecting..."
//                 : "Reject"}
//             </button>
//             <button
//               onClick={() => handleDelete(job._id)}
//               disabled={isLoading === job._id && loadingAction === "delete"}
//               className={`px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded ${
//                 isLoading === job._id && loadingAction === "delete"
//               } ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"`}
//             >
//               {isLoading === job._id && loadingAction === "delete"
//                 ? "Deleting..."
//                 : "Delete"}
//             </button>
//           </div>
//         </div>
//       ))}

//       {/* Users */}
//       <h2 className="text-2xl font-bold mt-10 mb-4">👥 Manage Users</h2>
//       {users.map((user) => (
//         <div key={user._id} className="bg-white p-4 shadow rounded mb-3">
//           <p>
//             <strong>{user.name}</strong> ({user.email}) –{" "}
//             <span className="capitalize">{user.role}</span>
//           </p>
//           <p>
//             Status:{" "}
//             <span className={user.isBanned ? "text-red-600" : "text-green-600"}>
//               {user.isBanned ? "Banned" : "Active"}
//             </span>
//           </p>
//           <div className="mt-2 flex gap-4">
//             <button
//               onClick={() => toggleBanUser(user._id).then(loadUsers)}
//               className={`px-3 py-1 ${
//                 user.isBanned ? "bg-green-600" : "bg-yellow-500"
//               } text-white rounded`}
//             >
//               {user.isBanned ? "Unban" : "Ban"}
//             </button>
//             <button
//               onClick={() => {
//                 if (window.confirm("Are you sure to delete this user?")) {
//                   deleteUser(user._id).then(loadUsers);
//                 }
//               }}
//               className="px-3 py-1 bg-red-600 text-white rounded"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       ))}

//       <div className="flex gap-4 my-6">
//         <button
//           onClick={() => downloadCSV("jobs")}
//           className="px-4 py-2 bg-blue-600 text-white rounded"
//         >
//           📁 Export Jobs CSV
//         </button>

//         <button
//           onClick={() => downloadCSV("users")}
//           className="px-4 py-2 bg-green-600 text-white rounded"
//         >
//           👥 Export Users CSV
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// pages/Dashboard/AdminDashboard.jsx
import { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Topbar from "../../components/admin/Topbar";
import JobList from "../../components/admin/JobList";
import UserList from "../../components/admin/UserList";
import { downloadCSV } from "../../services/adminService";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("jobs");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderRightAction = () => {
    if (activeTab === "jobs") {
      return (
        <button
          onClick={() => downloadCSV("jobs")}
          className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-sm"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Export Jobs
        </button>
      );
    } else if (activeTab === "users") {
      return (
        <button
          onClick={() => downloadCSV("users")}
          className="flex items-center gap-2 bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 text-sm"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Export Users
        </button>
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-1 flex pt-16">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <div className="flex-1 flex flex-col">
          <Topbar
            title={
              activeTab === "jobs" ? "📦 Job Listings" : "👥 Users Management"
            }
            onSidebarToggle={() => setSidebarOpen(true)}
            rightAction={renderRightAction()}
          />

          {/* Page Content */}
          <main className="w-full p-6 flex-1 overflow-y-auto lg:pl-72">
            {activeTab === "jobs" ? <JobList /> : <UserList />}
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
