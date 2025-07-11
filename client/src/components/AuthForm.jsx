import { useState } from "react";
import LoadingButton from "./LoadingButton";

const AuthForm = ({ isLogin, onSubmit, isLoading }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "seeker",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="max-w-md max-auto p-6 bg-white shadow-xl rounded-lg mt-20 mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
        {isLogin ? "Login" : "Register"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-700 rounded-md"
              onChange={handleChange}
              required
              disabled={isLoading}
            />

            <select
              name="role"
              id="role"
              className="w-full px-4 py-2 border border-gray-700 rounded-md"
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="seeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
              <option value="admin">Admin</option>
            </select>
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="email"
          className="w-full px-4 py-2 border border-gray-700 rounded-md"
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border border-gray-700 rounded-md"
          onChange={handleChange}
          required
          disabled={isLoading}
        />
        {/* <button
          type="submit"
          className={`w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded ${
            isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <LoadingButton
              type="submit"
              isLoading={isLoading}
              loadingText={isLogin ? "Logging in..." : "Registering..."}
            >
              {isLogin ? "Login" : "Register"}
            </LoadingButton>
          ) : isLogin ? (
            "Login"
          ) : (
            "Register"
          )}
        </button> */}
        <LoadingButton
          type="submit"
          isLoading={isLoading}
          loadingText={isLogin ? "Logging in..." : "Registering..."}
        >
          {isLogin ? "Login" : "Register"}
        </LoadingButton>
      </form>
    </div>
  );
};

export default AuthForm;

