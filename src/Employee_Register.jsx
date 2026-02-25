import React, { useState, useEffect } from "react";
import axios from "axios";

function Employee_Register({ editEmployee, onUpdateComplete }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    salary: "",
    department: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    if (editEmployee) {
      setFormData(editEmployee);
      setEditId(editEmployee.id);
      setIsEditMode(true);
    }
  }, [editEmployee]);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update request
        const response = await axios.put(
          `http://127.0.0.1:8000/api/update_employee/${editId}`,
          formData
        );
        alert(response.data.message);
        setIsEditMode(false);
        setEditId(null);
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          salary: "",
          department: "",
        });
        onUpdateComplete(); // refresh employees list
      } else {
        // Register request
        const response = await axios.post(
          "http://127.0.0.1:8000/api/register",
          formData
        );
        alert(response.data.message);
        setFormData({
          name: "",
          email: "",
          phone_number: "",
          salary: "",
          department: "",
        });
        onUpdateComplete(); // refresh employees list
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 border-0" style={{ width: "100%", maxWidth: "500px", borderRadius: "15px" }}>
        <h2 className="fw-bold text-primary text-center mb-3">
          {isEditMode ? "Edit Employee" : "Registration Form"}
        </h2>

        <form onSubmit={handleSubmit}>
          {["name","email","phone_number","salary","department"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label fw-semibold">{field.replace("_"," ").toUpperCase()}</label>
              <input
                type={field==="email"?"email":field==="salary"||field==="phone_number"?"number":"text"}
                name={field}
                className="form-control"
                value={formData[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button type="submit" className={`btn w-100 ${isEditMode?"btn-warning":"btn-primary"}`}>
            {isEditMode ? "Update" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Employee_Register;