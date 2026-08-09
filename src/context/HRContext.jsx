import { createContext, useContext, useEffect, useState } from "react";

import employeesData from "../Data/employes";
import departmentsData from "../Data/departments";
import attendanceData from "../Data/attendance";
import salaryData from "../Data/salary";
import leaveRequestData from "../Data/leaveRequestData";
export const HRContext = createContext();

export function HRProvider({ children }) {
  const [leaveRequests, setLeaveRequests] = useState(() => {
    const saved = localStorage.getItem("leaveRequests");
    return saved ? JSON.parse(saved) : leaveRequestData;
  });

  // Employees
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem("employees");
    return saved ? JSON.parse(saved) : employeesData;
  });

  // Departments
  const [departments, setDepartments] = useState(() => {
    const saved = localStorage.getItem("departments");
    return saved ? JSON.parse(saved) : departmentsData;
  });

  // Attendance
  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem("attendance");
    return saved ? JSON.parse(saved) : attendanceData;
  });
  const [salary, setSalary] = useState(() => {
    const saved = localStorage.getItem("salary");

    return saved ? JSON.parse(saved) : salaryData;
  });
  useEffect(() => {
    localStorage.setItem("leaveRequests", JSON.stringify(leaveRequests));
  }, [leaveRequests]);

  useEffect(() => {
    localStorage.setItem(
      "salary",

      JSON.stringify(salary)
    );
  }, [salary]);

  // Save Employees
  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  // Save Departments
  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  // Save Attendance
  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(attendance));
  }, [attendance]);


  return (
    <HRContext.Provider
      value={{
        employees,
        setEmployees,

        departments,
        setDepartments,

        attendance,
        setAttendance,

        salary,
        setSalary,

        leaveRequests,
        setLeaveRequests,
      }}
    >
      {children}
    </HRContext.Provider>
  );
}

export const useHR = () => useContext(HRContext);
