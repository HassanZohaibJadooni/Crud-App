import { useLocation, useNavigate, Routes, Route } from "react-router-dom";

function AppContent() {
  const [editEmployee, setEditEmployee] = useState(null);
  const [refreshList, setRefreshList] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation(); // Current path check karne ke liye

  function handleEdit(emp) {
    setEditEmployee(emp);
    navigate("/registration"); // Edit click hote hi form par bhejne ke liye
  }

  function handleUpdateComplete() {
    setRefreshList(!refreshList);
    setEditEmployee(null);
    navigate("/"); // Update ke baad wapas list par bhejne ke liye
  }

  function handleForm() {
    setEditEmployee(null); // Naya employee add karte waqt purana edit data clear karein
    navigate("/registration");
  }

  return (
    <div className="container mt-3">
      {/* Conditional Rendering: Agar path /registration nahi hai tabhi button dikhao */}
      {location.pathname !== "/registration" && (
        <button className="btn btn-primary mb-3" onClick={handleForm}>
          Add Employee
        </button>
      )}

      <Routes>
        <Route 
          path="/" 
          element={<Employees_List key={refreshList} onEdit={handleEdit} />} 
        />
        <Route 
          path="/registration" 
          element={<Employee_Register editEmployee={editEmployee} onUpdateComplete={handleUpdateComplete} />} 
        />
      </Routes>
    </div>
  );
}