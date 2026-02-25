import React, { useState, useEffect } from "react";
import axios from "axios";

function Employees_List({ onEdit }) {
  const [employees, setEmployees] = useState([]);

  async function fetchEmployees() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/EmployeeList");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchEmployees();
  }, []);

  function handleDelete(id) {
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`http://127.0.0.1:8000/api/delete_employees/${id}`)
        .then(() => fetchEmployees())
        .catch(console.error);
    }
  }

  return (
    <div className="container mt-4">
      <h1>Employees List</h1>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.phone_number}</td>
              <td>{emp.salary}</td>
              <td>{emp.department}</td>

              <td>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(emp.id)}>
                  Delete
                </button>
              </td>

              <td>
                <button className="btn btn-warning btn-sm" onClick={() => onEdit(emp)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Employees_List;
