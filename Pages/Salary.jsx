import { useState } from "react";
import { useHR } from "../src/context/HRContext";

import {
  Divider,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
} from "@mui/material";
import { Grid, Card, CardContent } from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InputAdornment from "@mui/material/InputAdornment";
import BadgeIcon from "@mui/icons-material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import GenerateSalaryForm from "../Components/GenerateSalaryForm";
import SalaryTable from "../Components/SalaryTable";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import PaymentsIcon from "@mui/icons-material/Payments";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SalarySlip from "../Components/SalarySlip";
import {toast } from "react-toastify";

export default function Salary() {
  const handleGenerateSalary = (data) => {
    // Find selected employee
    const employee = employees.find(
      (emp) => emp.id === Number(data.employeeId)
    );
    console.log("Employee:", employee);

    if (!employee) return;

    // Prevent duplicate salary
    const alreadyGenerated = salary.some(
      (item) =>
        item.employeeId === employee.id &&
        item.month === data.month &&
        item.year === Number(data.year)
    );

    if (alreadyGenerated) {
      toast.error("Salary already generated for this month.");
      return;
    }

    // Attendance for employee
    const employeeAttendance = attendance.filter(
      (item) => item.employee === employee.name
    );

    const present = employeeAttendance.filter(
      (item) => item.status === "Present"
    ).length;

    const absent = employeeAttendance.filter(
      (item) => item.status === "Absent"
    ).length;

    const leave = employeeAttendance.filter(
      (item) => item.status === "Leave"
    ).length;

    const basicSalary = Number(employee.salary);
    console.log("Basic Salary:", basicSalary);

    const workingDays = 30;

    const perDaySalary = basicSalary / workingDays;

    const deduction = absent * perDaySalary;

    const netSalary = basicSalary - deduction;

    const newSalary = {
      id: Date.now(),

      employeeId: employee.id,

      employee: employee.name,

      department: employee.department,

      month: data.month,

      year: Number(data.year),

      basicSalary,

      present,

      absent,

      leave,

      deduction: Math.round(deduction),

      netSalary: Math.round(netSalary),

      status: "Pending",
    };

    setSalary((prev) => [...prev, newSalary]);

    setOpenForm(false);
  };

  const { employees, attendance, salary, setSalary } = useHR();

  const [openForm, setOpenForm] = useState(false);
  const [openSlip, setOpenSlip] = useState(false);

  const [selectedSalary, setSelectedSalary] = useState(null);

  const [search, setSearch] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filteredSalary = salary.filter((item) => {
    const matchesSearch = item.employee
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesMonth = monthFilter === "" || item.month === monthFilter;

    const matchesYear = yearFilter === "" || String(item.year) === yearFilter;

    const matchesStatus = statusFilter === "" || item.status === statusFilter;

    return matchesSearch && matchesMonth && matchesYear && matchesStatus;
  });
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };
  const paginatedAttendance = filteredSalary.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const totalPayroll = salary.reduce(
    (sum, item) => sum + Number(item.netSalary || 0),
    0
  );

  const pendingPayments = salary.filter(
    (item) => item.status === "Pending"
  ).length;

  const paidPayments = salary.filter((item) => item.status === "Paid").length;

  const totalRecords = salary.length;
  const handleMarkPaid = (id) => {
    const updatedSalary = salary.map((item) =>
      item.id === id ? { ...item, status: "Paid" } : item
    );

    setSalary(updatedSalary);
  };
  const handleViewSlip = (salaryRecord) => {
    setSelectedSalary(salaryRecord);
    setOpenSlip(true);
  };
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredSalary);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Salary");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "SalaryReport.xlsx");
  };
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Salary Report", 14, 15);

    autoTable(doc, {
      startY: 25,

      head: [
        [
          "Employee",
          "Department",
          "Month",
          "Salary",
          "Present",
          "Absent",
          "Leave",
          "Deduction",
          "Net Salary",
          "Status",
        ],
      ],

      body: filteredSalary.map((item) => [
        item.employee,
        item.department,
        item.month,
        item.basicSalary,
        item.present,
        item.absent,
        item.leave,
        item.deduction,
        item.netSalary,
        item.status,
      ]),
    });

    doc.save("SalaryReport.pdf");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Salary Management
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "#1976d2",
              color: "#fff",
              boxShadow: 4,
            }}
          >
            <CardContent>
              <PaymentsIcon sx={{ fontSize: 40 }} />
              <Typography variant="subtitle2">Total Payroll</Typography>

              <Typography variant="h4" fontWeight="bold">
                Rs. {totalPayroll.toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "#fb8c00",
              color: "#fff",
              boxShadow: 4,
            }}
          >
            <CardContent>
              <PendingActionsIcon sx={{ fontSize: 40 }} />

              <Typography variant="subtitle2">Pending Payments</Typography>

              <Typography variant="h4" fontWeight="bold">
                {pendingPayments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "#2e7d32",
              color: "#fff",
              boxShadow: 4,
            }}
          >
            <CardContent>
              <CheckCircleIcon sx={{ fontSize: 40 }} />

              <Typography variant="subtitle2">Paid Payments</Typography>

              <Typography variant="h4" fontWeight="bold">
                {paidPayments}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              borderRadius: 4,
              bgcolor: "#8e24aa",
              color: "#fff",
              boxShadow: 4,
            }}
          >
            <CardContent>
              <ReceiptLongIcon sx={{ fontSize: 40 }} />

              <Typography variant="subtitle2">Salary Records</Typography>

              <Typography variant="h4" fontWeight="bold">
                {totalRecords}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <TextField
            //fullWidth
            placeholder="Search by employee or department..."
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
            sx={{
              mb: 3,

              "& .MuiOutlinedInput-root": {
                borderRadius: 3,

                bgcolor: "#fafafa",

                "&:hover": {
                  bgcolor: "#fff",
                },

                "&.Mui-focused": {
                  bgcolor: "#fff",
                },
              },
            }}
          />

          <TextField
            select
            label="Month"
            value={monthFilter}
            onChange={(e) => setMonthFilter(e.target.value)}
            size="small"
            sx={{
              minWidth: 190,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "#fafafa",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon color="primary" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">All</MenuItem>

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
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Year"
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
            size="small"
            sx={{
              minWidth: 100,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "#fafafa",
              },
            }}
          />

          <TextField
            select
            label="Status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            size="small"
            sx={{
              minWidth: 170,
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                bgcolor: "#fafafa",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon color="primary" />
                </InputAdornment>
              ),
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
          </TextField>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              setSearch("");
              setMonthFilter("");
              setYearFilter("");
              setStatusFilter("");
            }}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<FileDownloadIcon />}
            onClick={exportExcel}
          >
            Excel
          </Button>

          <Button
            variant="contained"
            color="error"
            startIcon={<PictureAsPdfIcon />}
            onClick={exportPDF}
          >
            PDF
          </Button>
        </Box>
        <Dialog
          open={openSlip}
          onClose={() => setOpenSlip(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Salary Slip</DialogTitle>

          <DialogContent>
            <SalarySlip salary={selectedSalary} />
          </DialogContent>
        </Dialog>

        <Button variant="contained" onClick={() => setOpenForm(true)}>
          + Generate Salary
        </Button>
      </Box>

      <SalaryTable
        salary={paginatedAttendance}
        handleMarkPaid={handleMarkPaid}
        handleViewSlip={handleViewSlip}
      />
      <TablePagination
        sx={{
          mt: 3,

          borderRadius: 3,

          bgcolor: "#fff",

          boxShadow: "0 4px 15px rgba(0,0,0,.08)",

          "& .MuiTablePagination-toolbar": {
            padding: "2px",
            minHeight: "20px",
          },
        }}
        component="div"
        count={filteredSalary.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Generate Salary</DialogTitle>

        <DialogContent>
          <GenerateSalaryForm
            employees={employees}
            onCancel={() => setOpenForm(false)}
            onGenerate={handleGenerateSalary}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

