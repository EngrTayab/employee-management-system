import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
export default function AddAttendanceForm({
  onAddAttendance,
  onCancel,
  initialData,
  isViewOnly,
  employees,
  attendance,
  leaveRequests,
  setLeaveRequests,
}) {
  const [formData, setFormData] = useState({
    employeeId: "",
    employee: "",
    department: "",
    date: "",
    checkIn: "",
    checkOut: "",
    hours: "",
    status: "Present",
    reason: "",
    
  });
  

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        employeeId: "",
        employee: "",
        department: "",
        date: "",
        checkIn: "",
        checkOut: "",
        hours: "",
        status: "Present",
        reason: "",
        
      });
    }
  }, [initialData]);

  const calculateHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return "";

    const start = new Date(`2000-01-01 ${checkIn}`);
    const end = new Date(`2000-01-01 ${checkOut}`);

    const diff = end - start;

    if (diff <= 0) return "";

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return `${hrs}h ${mins}m`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "employeeId") {
      const emp = employees.find((employee) => employee.id === Number(value));

      setFormData({
        ...formData,

        employeeId: emp.id,

        employee: emp.name,

        department: emp.department,
      });

      return;
    }

    let updated = {
      ...formData,

      [name]: value,
    };

    if (name === "checkIn" || name === "checkOut") {
      updated.hours = calculateHours(
        name === "checkIn" ? value : updated.checkIn,

        name === "checkOut" ? value : updated.checkOut
      );
    }

    if (name === "status") {
      if (value === "Absent"|| value === "Leave") {
        updated.checkIn = "";

        updated.checkOut = "";

        updated.hours = "0h 0m";
      }
    }

    setFormData(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.employee || !formData.date || !formData.status) {
      toast.warning("Please fill all required fields.");

      return;
    }

    const duplicate = attendance.some((item) => {
      if (initialData && item.id === initialData.id) return false;

      return (
        item.employeeId === formData.employeeId && item.date === formData.date
      );
    });

    if (duplicate) {
      toast.error("Attendance already marked.");

      return;
    }
    if (formData.status === "Leave") {

      const newLeave = {
          id: Date.now(),
          employeeId: formData.employeeId,
          employee: formData.employee,
          department: formData.department,
          date: formData.date,
          reason: formData.reason,
          status: "Pending"
      };
  
      setLeaveRequests([
          ...leaveRequests,
          newLeave
      ]);
  
      // Save attendance as Pending Leave
      onAddAttendance({
          ...formData,
          checkIn: "",
          checkOut: "",
          hours: "0h 0m",
          status: "Pending Leave"
      });
  
      onCancel();
  
      return;
    }
  };
  

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",

        flexDirection: "column",

        gap: 2,

        mt: 1,
      }}
    >
      <TextField
        select
        label="Employee"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        required
        disabled={isViewOnly}
      >
        {employees.map((employee) => (
          <MenuItem key={employee.id} value={employee.id}>
            {employee.name} ({employee.department})
          </MenuItem>
        ))}
      </TextField>

      <TextField label="Department" value={formData.department} disabled />

      <TextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        required
        disabled={isViewOnly}
      />

      <TextField
        select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        disabled={isViewOnly}
      >
        <MenuItem value="Present">Present</MenuItem>

        <MenuItem value="Absent">Absent</MenuItem>
        <MenuItem value="Leave">Leave</MenuItem>
      </TextField>
      {formData.status === "Leave" && (
        <TextField
          label="Leave Reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          multiline
          rows={3}
          required
          disabled={isViewOnly}
        />
      )}

      <TextField
        label="Check In"
        type="time"
        name="checkIn"
        value={formData.checkIn}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        disabled={
          isViewOnly ||
          formData.status === "Absent" ||
          formData.status === "Leave"
        }
      />

      <TextField
        label="Check Out"
        type="time"
        name="checkOut"
        value={formData.checkOut}
        onChange={handleChange}
        InputLabelProps={{
          shrink: true,
        }}
        disabled={isViewOnly || formData.status === "Absent" ||
            formData.status === "Leave"}
      />

      <TextField label="Working Hours" value={formData.hours} disabled />

      <Box
        sx={{
          display: "flex",

          justifyContent: "flex-end",

          gap: 1,
        }}
      >
        <Button onClick={onCancel}>Cancel</Button>

        {!isViewOnly && (
          <Button type="submit" variant="contained">
            {initialData ? "Update" : "Save"}
          </Button>
        )}
      </Box>
    </Box>
  );
}
