import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard";
import Employes from "../Pages/Employes";
import Departments from "../Pages/Departments";
import Salary from "../Pages/Salary";
import Attendence from "../Pages/Attendence";
import LeaveRequests from "../Pages/LeaveRequests";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/navbar";
import { ToastContainer } from "react-toastify";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar
          toggleSidebar={toggleSidebar}
          search={search}
          setSearch={setSearch}
        />

        <div className="container">
          <Sidebar open={sidebarOpen} />

          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route path="/dashboard" element={<Dashboard />} />

              <Route path="/employes" element={<Employes />} />

              <Route path="/departments" element={<Departments />} />

              <Route path="/salary" element={<Salary />} />

              <Route path="/attendence" element={<Attendence />} />

              <Route path="/leave-requests" element={<LeaveRequests />} />
            </Routes>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
