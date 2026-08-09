import { useState, useEffect } from "react";
// import employeesData from "../src/Data/employes";
import { useHR } from "../src/context/HRContext";
import EmployeeTable from "../Components/EmployeeTable";
import AddEmployeeForm from "../Components/AddEmployeeForm";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
// Material-UI components
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import TablePagination from "@mui/material/TablePagination";

export default function Employes() {
  const { employees, setEmployees } = useHR();

  const { departments } = useHR();

  const [search, setSearch] = useState("");
  const [openForm, setOpenForm] = useState(false);

  // Holds the employee object being edited, or null if adding a new one
  const [editingEmployee, setEditingEmployee] = useState(null);
  // Tracks whether the form should be read-only
  const [isViewOnly, setIsViewOnly] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const searchEmployee = (event) => {
    setSearch(event.target.value);
  };

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(search.toLowerCase()) ||
      employee.department.toLowerCase().includes(search.toLowerCase()) ||
      employee.status.toLowerCase().includes(search.toLowerCase())
  );

  // Opens modal empty for ADDING
  const handleOpenAddModal = () => {
    setEditingEmployee(null);
    setOpenForm(true);
  };

  // Opens modal pre-filled for EDITING
  const handleOpenEditModal = (employee) => {
    setEditingEmployee(employee);
    setOpenForm(true);
  };
  // Opens modal for VIEWING (Read-only)
  const handleOpenViewModal = (employee) => {
    setEditingEmployee(employee);
    setIsViewOnly(true);
    setOpenForm(true);
  };
  const handleOpenDelete = (employee) => {
    setSelectedEmployee(employee);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    handleDelete(selectedEmployee.id);

    toast.success(`${selectedEmployee.name} deleted successfully.`);

    setOpenDelete(false);
    setSelectedEmployee(null);
  };

  // Saves either NEW or UPDATED employee
  const handleSaveEmployee = (empData) => {
    if (editingEmployee) {
      // UPDATE logic: keep existing ID, overwrite matching item
      const updatedList = employees.map((emp) =>
        emp.id === editingEmployee.id
          ? { ...emp, ...empData, id: editingEmployee.id }
          : emp
      );
      setEmployees(updatedList);
      toast.success("Employee updated successfully!");
    } else {
      // ADD logic: generate next ID
      const nextId =
        employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
      const newEmpWithId = { ...empData, id: nextId };
      setEmployees((prev) => [...prev, newEmpWithId]);
      toast.success("Employee added successfully!");
    }

    setOpenForm(false);
    setEditingEmployee(null);
    setIsViewOnly(false);
  };

  const handleDelete = (id) => {
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);
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
  const paginatedEmployees = filteredEmployees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ padding: "20px" }}>
      <h1>Employees</h1>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          gap: 2,
        }}
      >
        <TextField
          style={{
            padding: "10px",
            width: "300px",
            border: "1px solid black",
            borderRadius: "10px",
          }}
          type="text"
          placeholder="Search employee"
          onChange={searchEmployee}
          value={search}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddModal}
        >
          + Add Employee
        </Button>
      </Box>
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {isViewOnly
            ? "Employee Details"
            : editingEmployee
            ? "Edit Employee"
            : "Add New Employee"}
        </DialogTitle>
        <DialogContent>
          <AddEmployeeForm
            onAddEmployee={handleSaveEmployee}
            onCancel={() => setOpenForm(false)}
            initialData={editingEmployee}
            isViewOnly={isViewOnly}
            employees={employees}
            departments={departments}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Employee</DialogTitle>

        <DialogContent>
          Are you sure you want to delete
          <strong> {selectedEmployee?.name}</strong>?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <EmployeeTable
        employees={paginatedEmployees}
        handleDelete={handleOpenDelete}
        handleEdit={handleOpenEditModal} // PASSING EDIT HANDLER HERE
        handleView={handleOpenViewModal}
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
        count={filteredEmployees.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}
