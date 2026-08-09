import { useState } from "react";
import { useHR } from "../src/context/HRContext";

import AttendanceTable from "../Components/AttendanceTable";
import AddAttendanceForm from "../Components/AddAttendanceForm";

import TablePagination from "@mui/material/TablePagination";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import TodayIcon from "@mui/icons-material/Today";
import RefreshIcon from "@mui/icons-material/Refresh";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

import { toast } from "react-toastify";

export default function Attendance() {
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredAttendance);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });

    saveAs(file, "Attendance.xlsx");
  };
  const exportPDF = () => {
    const doc = new jsPDF();

    doc.text("Attendance Report", 14, 15);

    autoTable(doc, {
      head: [
        ["Employee", "Department", "Date", "Status", "Check In", "Check Out"],
      ],

      body: filteredAttendance.map((item) => [
        item.employee,

        item.department,

        item.date,

        item.status,

        item.checkIn,

        item.checkOut,
      ]),
    });

    doc.save("Attendance.pdf");
  };
  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));

    setPage(0);
  };

  const {
    attendance,
    setAttendance,
    employees,
    leaveRequests,
    setLeaveRequests,
  } = useHR();

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [editingAttendance, setEditingAttendance] = useState(null);

  const [isViewOnly, setIsViewOnly] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [selectedAttendance, setSelectedAttendance] = useState(null);

  const [employeeFilter, setEmployeeFilter] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [fromDate, setFromDate] = useState("");

  const [toDate, setToDate] = useState("");

  const filteredAttendance = attendance.filter((item) => {
    const matchesSearch =
      item.employee.toLowerCase().includes(search.toLowerCase()) ||
      item.department.toLowerCase().includes(search.toLowerCase());

    const matchesEmployee =
      employeeFilter === "" || item.employee === employeeFilter;

    const matchesStatus = statusFilter === "" || item.status === statusFilter;
    const matchesDate =
      (!fromDate || item.date >= fromDate) && (!toDate || item.date <= toDate);

    return matchesSearch && matchesEmployee && matchesStatus && matchesDate;
  });
  const paginatedAttendance = filteredAttendance.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleOpenAdd = () => {
    setEditingAttendance(null);
    setIsViewOnly(false);
    setOpenForm(true);
  };
  const handleOpenView = (record) => {
    setEditingAttendance(record);

    setIsViewOnly(true);

    setOpenForm(true);
  };

  const handleOpenEdit = (record) => {
    setEditingAttendance(record);

    setIsViewOnly(false);

    setOpenForm(true);
  };

  const handleSaveAttendance = (attendanceData) => {
    if (editingAttendance) {
      const updated = attendance.map((item) =>
        item.id === editingAttendance.id
          ? {
              ...attendanceData,
              id: editingAttendance.id,
            }
          : item
      );

      setAttendance(updated);

      toast.success("Attendance updated successfully.");
    } else {
      const nextId =
        attendance.length > 0
          ? Math.max(...attendance.map((a) => a.id)) + 1
          : 1;

      let attendanceStatus = attendanceData.status;

      if (attendanceData.status === "Leave") {
        attendanceStatus = "Pending Leave";
      }

      const newAttendance = {
        ...attendanceData,
        id: nextId,
        status: attendanceStatus,
      };

      setAttendance([...attendance, newAttendance]);

      // Automatically create Leave Request
      if (attendanceData.status === "Leave") {
        const newLeaveRequest = {
          id: Date.now(),
          attendanceId: nextId,
          employeeId: attendanceData.employeeId,
          employee: attendanceData.employee,
          department: attendanceData.department,
          date: attendanceData.date,
          reason: attendanceData.reason || "No reason provided",
          status: "Pending",
        };

        setLeaveRequests((prev) => [...prev, newLeaveRequest]);
      }

      toast.success("Attendance added successfully.");
    }

    setOpenForm(false);

    setEditingAttendance(null);

    setIsViewOnly(false);
  };

  const handleOpenDelete = (record) => {
    setSelectedAttendance(record);

    setOpenDelete(true);
  };

  const confirmDelete = () => {
    setAttendance(
      attendance.filter((item) => item.id !== selectedAttendance.id)
    );

    toast.success(`${selectedAttendance.employee} deleted successfully.`);

    setOpenDelete(false);

    setSelectedAttendance(null);
  };

  return (
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
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 4,
          border: "1px solid #e5e7eb",
          background: "#fff",
          boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
        }}
      ></Paper>

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
          label="Employee"
          value={employeeFilter}
          onChange={(e) => setEmployeeFilter(e.target.value)}
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
                <PersonIcon color="primary" />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="">All Employees</MenuItem>

          {employees.map((emp) => (
            <MenuItem key={emp.id} value={emp.name}>
              {emp.name}
            </MenuItem>
          ))}
        </TextField>

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
          <MenuItem value="Present">Present</MenuItem>
          <MenuItem value="Absent">Absent</MenuItem>
          <MenuItem value="Pending Leave">Pending Leave</MenuItem>
          <MenuItem value="Leave">Approved Leave</MenuItem>
        </TextField>
        

        <TextField
          type="date"
          label="From"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{
            minWidth: 180,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "#fafafa",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon color="primary" fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          type="date"
          label="To"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
          sx={{
            minWidth: 180,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "#fafafa",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon color="primary" fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Button
        startIcon={<TodayIcon />}
        variant="outlined"
        color="primary"
        onClick={() => {
          const today = new Date().toISOString().split("T")[0];

          setFromDate(today);

          setToDate(today);
        }}
      >
        Today
      </Button>
      <Button
        startIcon={<RefreshIcon />}
        variant="outlined"
        color="warning"
        onClick={() => {
          setSearch("");

          setEmployeeFilter("");

          setStatusFilter("");

          setFromDate("");

          setToDate("");
        }}
      >
        Reset
      </Button>
      <Button
        onClick={exportExcel}
        variant="contained"
        color="success"
        startIcon={<FileDownloadIcon />}
      >
        ToExcel
      </Button>
      <Button
        onClick={exportPDF}
        variant="contained"
        color="error"
        startIcon={<PictureAsPdfIcon />}
      >
        ToPDF
      </Button>
      <Button
        variant="contained"
        onClick={handleOpenAdd}
        startIcon={<AddIcon />}
        sx={{
          ml: "auto",

          px: 3,

          fontWeight: "bold",
        }}
      >
        Mark Attendance
      </Button>

      <AttendanceTable
        attendance={paginatedAttendance}
        handleView={handleOpenView}
        handleEdit={handleOpenEdit}
        handleDelete={handleOpenDelete}
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
        count={filteredAttendance.length}
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
        <DialogTitle>
          {editingAttendance ? "Edit Attendance" : "Add Attendance"}
        </DialogTitle>

        <DialogContent>
          <AddAttendanceForm
            onAddAttendance={handleSaveAttendance}
            onCancel={() => {
              setOpenForm(false);

              setEditingAttendance(null);

              setIsViewOnly(false);
            }}
            initialData={editingAttendance}
            isViewOnly={isViewOnly}
            employees={employees}
            attendance={attendance}
            leaveRequests={leaveRequests}
            setLeaveRequests={setLeaveRequests}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Attendance</DialogTitle>

        <DialogContent>
          Are you sure you want to delete attendance of
          <strong> {selectedAttendance?.employee}</strong>?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
