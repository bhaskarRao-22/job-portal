// components/admin/UserList.jsx
import { useEffect, useState } from "react";
import {
  getAllUsers,
  toggleBanUser,
  deleteUser,
  downloadCSV,
} from "../../services/adminService";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  const loadUsers = async (actionType) => {
    const res = await getAllUsers();
    setUsers(res.data);
    if (actionType === "UPDATE") {
      toast.success("Record successfully updated!");
    }
    setLoadingId(null);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">👥 Users</h2>
        <button
          onClick={() => downloadCSV("users")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <ArrowDownTrayIcon className="w-5 h-5" /> Export Users
        </button>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="rounded-2xl border border-gray-200 bg-violet-100/20 p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 shadow-md"
          >
            <p>
              <strong>{user.name}</strong>
            </p>
            <p>({user.email})</p>
            <p className="text-sm capitalize">Role: {user.role}</p>
            <p className="text-sm">
              Status:{" "}
              <span
                className={user.isBanned ? "text-red-600" : "text-green-600"}
              >
                {user.isBanned ? "Banned" : "Active"}
              </span>
            </p>
            <div className="mt-3 grid grid-flow-col justify-items-center">
              <button
                onClick={async () => {
                  setLoadingId(user._id);
                  await toggleBanUser(user._id);
                  loadUsers("UPDATE");
                }}
                className={`px-3 py-1 rounded text-white text-sm ${
                  user.isBanned ? "bg-green-600" : "bg-yellow-500"
                }`}
                disabled={loadingId === user._id}
              >
                {loadingId === user._id
                  ? "Please wait..."
                  : user.isBanned
                  ? "Unban"
                  : "Ban"}
              </button>
              <button
                onClick={() => {
                  if (window.confirm("Confirm delete?")) {
                    deleteUser(user._id).then(() => {
                      loadUsers();
                      toast.error("User deleted");
                    });
                  }
                }}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;
