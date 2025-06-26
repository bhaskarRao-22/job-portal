import React, { useState } from "react";

const AuthForm = ({ isLogin, onSubmit }) => {
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
    <div className="max-w-md max-auto p-6 bg-white shadow-xl rounded-lg  mt-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md"
              onChange={handleChange}
              required
            />

            <select name="role" id="role" className="w-full px-4 py-2 border rounded-md" onChange={handleChange}>
              <option value="seeker">Job Seeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="email"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-md"
          onChange={handleChange}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
