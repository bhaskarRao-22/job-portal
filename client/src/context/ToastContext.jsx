// src/context/ToastContext.js
import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    message: "",
    type: "success",
    visible: false,
  });

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
      setTimeout(
        () => setToast({ message: "", type: "success", visible: false }),
        300
      );
    }, duration);
  };

  const closeToast = () => {
    setToast((prev) => ({ ...prev, visible: false }));
    setTimeout(
      () => setToast({ message: "", type: "success", visible: false }),
      300
    );
  };

  return (
    <ToastContext.Provider value={{ showToast, closeToast }}>
      {children}
      {toast.message && (
        <div
          className={`flex items-center w-full max-w-xs p-4 mb-4 text-red-500 bg-white text-sm fixed top-4 right-4 rounded-lg shadow border ease-in-out transition-transform transform z-[9999] ${
            toast.visible ? "translate-x-0" : "translate-x-full"
          } ${
            toast.type === "success"
              ? "bg-green-800 text-green-100 border-green-500"
              : "bg-red-800 text-red-100 border-red-500"
          }`}
        >
          {toast.type === "success" ? (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-4 text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                data-slot="icon"
                className="xlh xmj"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                ></path>
              </svg>
            </div>
          ) : (
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-4 text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
              <span className="sr-only">Error icon</span>
            </div>
          )}
          <div
            className={`ms-3 text-sm font-normal ${
              toast.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {toast.message}
          </div>
          <button
            onClick={closeToast}
            className="ml-auto text-gray-500 hover:text-gray-800 dark:hover:text-white"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </ToastContext.Provider>
  );
};
