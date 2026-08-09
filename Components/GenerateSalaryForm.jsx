import { useState } from "react";

import {
  Box,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";

export default function GenerateSalaryForm({
  employees,
  onGenerate,
  onCancel,
}) {
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    employeeId: "",
    month: "",
    year: currentYear,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.employeeId ||
      !formData.month ||
      !formData.year
    ) {
      return;
    }

    onGenerate(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mt: 1,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        select
        label="Employee"
        name="employeeId"
        value={formData.employeeId}
        onChange={handleChange}
        required
      >
        {employees.map((emp) => (
          <MenuItem
            key={emp.id}
            value={emp.id}
          >
            {emp.name}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        select
        label="Month"
        name="month"
        value={formData.month}
        onChange={handleChange}
        required
      >
        {[
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ].map((month) => (
          <MenuItem
            key={month}
            value={month}
          >
            {month}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        type="number"
        label="Year"
        name="year"
        value={formData.year}
        onChange={handleChange}
        required
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 2,
          mt: 2,
        }}
      >
        <Button
          variant="outlined"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
        >
          Generate Salary
        </Button>
      </Box>
    </Box>
  );
}