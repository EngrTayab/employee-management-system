import { useState } from "react";
import { useHR } from "../src/context/HRContext";
import LeaveRequestTable from "../Components/LeaveRequestTable";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TablePagination from "@mui/material/TablePagination";

export default function LeaveRequests() {

    const {
        leaveRequests,
        setLeaveRequests,
        attendance,
        setAttendance,
      } = useHR();

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleApprove = (id) => {
        const leave = leaveRequests.find((l) => l.id === id);
      
        // Update leave request
        const updatedLeave = leaveRequests.map((l) =>
          l.id === id ? { ...l, status: "Approved" } : l
        );
      
        setLeaveRequests(updatedLeave);
      
        // Update attendance
        const updatedAttendance = attendance.map((a) =>
          a.employeeId === leave.employeeId && a.date === leave.date
            ? { ...a, status: "Leave" }
            : a
        );
      
        setAttendance(updatedAttendance);
      };
      const handleReject = (id) => {
        const leave = leaveRequests.find((l) => l.id === id);
      
        // Update leave request
        const updatedLeave = leaveRequests.map((l) =>
          l.id === id ? { ...l, status: "Rejected" } : l
        );
      
        setLeaveRequests(updatedLeave);
      
        // Update attendance
        const updatedAttendance = attendance.map((a) =>
          a.employeeId === leave.employeeId && a.date === leave.date
            ? { ...a, status: "Absent" }
            : a
        );
      
        setAttendance(updatedAttendance);
      };

    const paginatedLeave = leaveRequests.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (

        <Box sx={{ p: 2 }}>

            <Typography variant="h4" mb={3}>
                Leave Requests
            </Typography>

            <LeaveRequestTable
                leaveRequests={paginatedLeave}
                handleApprove={handleApprove}
                handleReject={handleReject}
            />

            <TablePagination
                component="div"
                count={leaveRequests.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={(e, newPage) => setPage(newPage)}
                onRowsPerPageChange={(e) => {
                    setRowsPerPage(parseInt(e.target.value, 10));
                    setPage(0);
                }}
            />

        </Box>

    );

}