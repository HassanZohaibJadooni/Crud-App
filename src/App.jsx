import React, { useState } from "react";
import Employee_Register from "./Employee_Register";
import Employees_List from "./Employees_List";
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";

function AppContent() {
  const [editEmployee, setEditEmployee] = useState(null);
  const [refreshList, setRefreshList] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleEdit(emp) {
    setEditEmployee(emp);
    navigate("/registration");
  }

  function handleUpdateComplete() {
    setRefreshList(!refreshList);
    setEditEmployee(null);
    navigate("/");
  }

  function handleForm() {
    setEditEmployee(null);
    navigate("/registration");
  }

  return (
    <div className="container mt-4">
      {location.pathname !== "/registration" && (
        <button className="btn btn-primary mb-3 d-flex justify-content-end" onClick={handleForm}>
          Add Employee
        </button>
      )}

      <Routes>
        <Route path="/" element={<Employees_List key={refreshList} onEdit={handleEdit} />} />
        <Route path="/registration" element={<Employee_Register editEmployee={editEmployee} onUpdateComplete={handleUpdateComplete} />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
