import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  Chip,
  Button,
} from "@mui/material";

export default function SalaryTable({
  salary,
  handleMarkPaid,
  handleViewSlip,
}) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        boxShadow: "0 6px 18px rgba(0,0,0,.08)",
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: "primary.main",
            }}
          >
            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Employee
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Department
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Month
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Salary
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Present
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Absent
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Leave
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Deduction
            </TableCell>

            <TableCell sx={{ color: "#fff", fontWeight: "bold" }}>
              Net Salary
            </TableCell>

            <TableCell
              align="center"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Status
            </TableCell>

            <TableCell
              align="center"
              sx={{ color: "#fff", fontWeight: "bold" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {salary.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} align="center">
                <Typography py={3} color="text.secondary">
                  No salary records found.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            salary.map((item) => (
              <TableRow
                key={item.id}
                hover
              >
                <TableCell>{item.employee}</TableCell>

                <TableCell>{item.department}</TableCell>

                <TableCell>
                  {item.month} {item.year}
                </TableCell>

                <TableCell>
                  Rs. {item.basicSalary}
                </TableCell>

                <TableCell>{item.present}</TableCell>

                <TableCell>{item.absent}</TableCell>

                <TableCell>{item.leave}</TableCell>

                <TableCell sx={{ color: "error.main" }}>
                  Rs. {item.deduction}
                </TableCell>

                <TableCell
                  sx={{
                    color: "success.main",
                    fontWeight: "bold",
                  }}
                >
                  Rs. {item.netSalary}
                </TableCell>

                <TableCell align="center">
                  <Chip
                    label={item.status}
                    color={
                      item.status === "Paid"
                        ? "success"
                        : "warning"
                    }
                    size="small"
                  />
                </TableCell>

                <TableCell align="center">
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleViewSlip(item)}
                    sx={{ mr: 1 }}
                  >
                    View Slip
                  </Button>

                  {item.status === "Pending" ? (
                    <Button
                      size="small"
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleMarkPaid(item.id)
                      }
                    >
                      Mark Paid
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      disabled
                      variant="outlined"
                    >
                      Paid
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}