import { useEffect } from "react";
import {
  BriefcaseIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const baseBtn =
    "flex items-center gap-3 px-4 py-2 rounded-lg w-full text-left text-sm font-medium";

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-16 left-0 h-[calc(100%-4rem)] border-r border-gray-200 p-6 z-40 transform transition-transform shadow-md bg-light-900/80 backdrop-blur-[50px]
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 w-64 overflow-y-auto`}
      >
        <div className="flex justify-between lg:hidden mb-4">
          <button onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-8">🧑‍⚖️ Admin Panel</h2>
        <nav className="space-y-3">
          <button
            onClick={() => {
              setActiveTab("jobs");
              setSidebarOpen(false);
            }}
            className={`${baseBtn} ${
              activeTab === "jobs"
                ? "bg-blue-100 text-indigo-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <BriefcaseIcon className="w-5 h-5" />
            Jobs
          </button>

          <button
            onClick={() => {
              setActiveTab("users");
              setSidebarOpen(false);
            }}
            className={`${baseBtn} ${
              activeTab === "users"
                ? "bg-blue-100 text-indigo-600"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <UserGroupIcon className="w-5 h-5" />
            Users
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
