// components/admin/Topbar.jsx
import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Topbar = ({ title, onSidebarToggle }) => {
  return (
    <header className="w-full border-b border-gray-200 px-6 py-4 fixed top-16 lg:top-16 lg:left-64 shadow-md z-10 bg-light-900/80 backdrop-blur-[50px]">
      <div className="flex justify-between items-center">
      {/* Sidebar toggle (mobile only) */}
      <div className="lg:hidden mr-4">
        <button
          onClick={onSidebarToggle}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>
        <h1 className="text-xl font-semibold">{title}</h1>
        <button className="flex items-center px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
          <Cog6ToothIcon className="h-5 w-5 mr-1" />
          Settings
        </button>
      </div>
    </header>
  );
};

export default Topbar;
