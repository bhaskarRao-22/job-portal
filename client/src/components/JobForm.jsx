import React from "react";
import { useState } from "react";
import LoadingButton from "./LoadingButton";

const JobForm = ({ onSubmit, initialValues = {}, buttonLabel, isLoading }) => {
  const initialFormState = {
    title: "",
    company: "",
    location: "",
    salary: "",
    skills: "",
    description: "",
  };

  const [form, setForm] = useState({
    // title: initialValues.title || "",
    // company: initialValues.company || "",
    // location: initialValues.location || "",
    // salary: initialValues.salary || "",
    // skills: initialValues.skills?.join(", ") || "",
    // description: initialValues.description || "",
    ...initialFormState,
    ...initialValues,
    skills: initialValues.skills?.join(", ") || "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.company.trim()) newErrors.company = "Company is required";
    if (!form.skills.trim())
      newErrors.skills = "At least one skill is required";

    if (form.salary && isNaN(form.salary)) {
      newErrors.salary = "Salary must be a number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const data = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
    };
    onSubmit(data);
    setForm(initialFormState);
    setErrors({});
  };

  const renderInput = (field, label, type = "text") => (
    <div>
      <input
        type={type}
        name={field}
        placeholder={label}
        value={form[field]}
        onChange={handleChange}
        className={`w-full border px-3 py-2 rounded ${
          errors[field] ? "border-red-500" : ""
        }`}
      />
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderInput("title", "Job Title")}
      {renderInput("company", "Company")}
      {renderInput("location", "Location")}
      {renderInput("salary", "Salary", "number")}

      {/* {["title", "company", "location", "salary", "description"].map(
        (field) => (
          <input
            key={field}
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        )
      )} */}
      <div>
        <input
          name="skills"
          placeholder="Skills (comma-separated)"
          value={form.skills}
          onChange={handleChange}
          className={`w-full border px-3 py-2 rounded ${
            errors.skills ? "border-red-500" : ""
          }`}
        />
        {errors.skills && (
          <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
        )}
      </div>
      <LoadingButton type="submit" isLoading={isLoading} loadingText="Wait...">
        {buttonLabel}
      </LoadingButton>
    </form>
  );
};

export default JobForm;
