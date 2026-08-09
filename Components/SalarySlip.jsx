import {
    Box,
    Typography,
    Divider,
    Grid,
    Chip,
  } from "@mui/material";
  
  export default function SalarySlip({ salary }) {
    if (!salary) return null;
  
    return (
      <Box sx={{ p: 2 }}>
        {/* Company */}
        <Typography
          variant="h5"
          align="center"
          fontWeight="bold"
        >
          Employee Management System
        </Typography>
  
        <Typography
          align="center"
          color="text.secondary"
          mb={3}
        >
          Salary Slip
        </Typography>
  
        <Divider sx={{ mb: 3 }} />
  
        {/* Employee Details */}
  
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              <strong>Employee:</strong> {salary.employee}
            </Typography>
          </Grid>
  
          <Grid item xs={6}>
            <Typography>
              <strong>Department:</strong> {salary.department}
            </Typography>
          </Grid>
  
          <Grid item xs={6}>
            <Typography>
              <strong>Month:</strong> {salary.month}
            </Typography>
          </Grid>
  
          <Grid item xs={6}>
            <Typography>
              <strong>Year:</strong> {salary.year}
            </Typography>
          </Grid>
        </Grid>
  
        <Divider sx={{ my: 3 }} />
  
        {/* Salary Details */}
  
        <Typography variant="h6" gutterBottom>
          Salary Details
        </Typography>
  
        <Grid container spacing={1}>
          <Grid item xs={8}>
            Basic Salary
          </Grid>
  
          <Grid item xs={4}>
            Rs. {salary.basicSalary}
          </Grid>
  
          <Grid item xs={8}>
            Present Days
          </Grid>
  
          <Grid item xs={4}>
            {salary.present}
          </Grid>
  
          <Grid item xs={8}>
            Absent Days
          </Grid>
  
          <Grid item xs={4}>
            {salary.absent}
          </Grid>
  
          <Grid item xs={8}>
            Leave Days
          </Grid>
  
          <Grid item xs={4}>
            {salary.leave}
          </Grid>
  
          <Grid item xs={8}>
            Deduction
          </Grid>
  
          <Grid item xs={4}>
            Rs. {salary.deduction}
          </Grid>
  
          <Grid item xs={8}>
            <Typography fontWeight="bold">
              Net Salary
            </Typography>
          </Grid>
  
          <Grid item xs={4}>
            <Typography
              fontWeight="bold"
              color="primary"
            >
              Rs. {salary.netSalary}
            </Typography>
          </Grid>
        </Grid>
  
        <Divider sx={{ my: 3 }} />
  
        {/* Payment Status */}
  
        <Typography mb={2}>
          <strong>Payment Status: </strong>
  
          <Chip
            label={salary.status}
            color={
              salary.status === "Paid"
                ? "success"
                : "warning"
            }
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>
  
        <Divider sx={{ my: 3 }} />
  
        {/* Signature */}
  
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 5,
          }}
        >
          <Box>
            ___________________
  
            <Typography>
              Employee Signature
            </Typography>
          </Box>
  
          <Box>
            ___________________
  
            <Typography>
              HR Manager
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  }