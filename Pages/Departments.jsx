import { useState, useEffect } from "react";
import { useHR } from "../src/context/HRContext";
import { toast } from "react-toastify";
import DepartmentTable from "../Components/DepartmentTable";
import AddDepartmentForm from "../Components/AddDepartmentForm";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TablePagination from "@mui/material/TablePagination";

export default function Departments() {
  const { departments, setDepartments, employees } = useHR();

  const [search, setSearch] = useState("");

  const [openForm, setOpenForm] = useState(false);

  const [editingDepartment, setEditingDepartment] = useState(null);

  const [isViewOnly, setIsViewOnly] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const filteredDepartments = departments.filter(
    (department) =>
      department.name.toLowerCase().includes(search.toLowerCase()) ||
      department.code.toLowerCase().includes(search.toLowerCase()) ||
      department.manager.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setEditingDepartment(null);
    setOpenForm(true);
  };

  const handleOpenEditModal = (department) => {
    setEditingDepartment(department);
    setOpenForm(true);
  };

  const handleOpenViewModal = (department) => {
    setEditingDepartment(department);
    setIsViewOnly(true);
    setOpenForm(true);
  };

  const handleSaveDepartment = (deptData) => {
    if (editingDepartment) {
      const updated = departments.map((dept) =>
        dept.id === editingDepartment.id
          ? { ...dept, ...deptData, id: editingDepartment.id }
          : dept
      );

      setDepartments(updated);
      toast.success("Details updated successfully!");
    } else {
      const nextId =
        departments.length > 0
          ? Math.max(...departments.map((d) => d.id)) + 1
          : 1;

      setDepartments([...departments, { ...deptData, id: nextId }]);
      toast.success("Department added successfully!");
    }

    setOpenForm(false);
    setEditingDepartment(null);
    setIsViewOnly(false);
  };
  const handleOpenDelete = (Department) => {
    setSelectedDepartment(Department);
    setOpenDelete(true);
  };

  const confirmDelete = () => {
    handleDelete(selectedDepartment.id);

    toast.success(`${selectedDepartment.name} deleted successfully.`);

    setOpenDelete(false);
    setSelectedDepartment(null);
  };

  const handleDelete = (id) => {
    const department = departments.find((dept) => dept.id === id);

    const employees = JSON.parse(localStorage.getItem("employees")) || [];

    const employeeCount = employees.filter(
      (emp) => emp.department === department.code
    ).length;

    if (employeeCount > 0) {
      toast.warning(
        `Cannot delete "${department.name}". ${employeeCount} employee(s) are assigned to this department.`
      );
      return;
    }

    const updatedDepartments = departments.filter((dept) => dept.id !== id);

    setDepartments(updatedDepartments);
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
  const paginatedDepartments = filteredDepartments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box p={2}>
      <h1>Departments</h1>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 2,
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
          placeholder="Search Department"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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

        <Button variant="contained" onClick={handleOpenAddModal}>
          + Add Department
        </Button>
      </Box>

      <Dialog
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setIsViewOnly(false);
        }}
        fullWidth
      >
        <DialogTitle>
          {isViewOnly
            ? "Department Details"
            : editingDepartment
            ? "Edit Department"
            : "Add Department"}
        </DialogTitle>

        <DialogContent>
          <AddDepartmentForm
            initialData={editingDepartment}
            onAddDepartment={handleSaveDepartment}
            onCancel={() => {
              setOpenForm(false);
              setIsViewOnly(false);
            }}
            isViewOnly={isViewOnly}
            departments={departments}
            employees={employees}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Employee</DialogTitle>

        <DialogContent>
          Are you sure you want to delete
          <strong> {selectedDepartment?.name}</strong>?
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>

          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <DepartmentTable
        departments={paginatedDepartments}
        employees={employees}
        handleDelete={handleOpenDelete}
        handleEdit={handleOpenEditModal}
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
        count={filteredDepartments.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Box>
  );
}
