import { Cog6ToothIcon, DocumentPlusIcon, ClipboardIcon, ChartBarIcon } from "@heroicons/react/24/outline";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Dashboard", icon: ChartBarIcon },
    { id: "post", label: "Post Job", icon: DocumentPlusIcon },
    { id: "jobs", label: "My Jobs", icon: ClipboardIcon },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-center py-4 border-b">Recruiter Panel</h2>
        <ul className="p-4 space-y-2">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer 
              ${
                activeTab === tab.id
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Settings bottom */}
      <div className="p-4 border-t">
        <div
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-4 py-2 rounded cursor-pointer 
          ${
            activeTab === "settings"
              ? "bg-blue-100 text-blue-600 font-semibold"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          <Cog6ToothIcon className="h-5 w-5" />
          Settings
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
