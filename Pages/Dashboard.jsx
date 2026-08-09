import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PaymentsIcon from "@mui/icons-material/Payments";
import DashboardCard from "../Components/DashboardCard";
import DashboardHeader from "../Components/DashboardHeader";
import DashboardCharts from "../Components/DashboardCharts";
import RecentEmployees from "../Components/RecentEmployees";
import DepartmentSummary from "../Components/DepartmentSummary";
import QuickActions from "../Components/QuickActions";
import { useHR } from "../src/context/HRContext";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
export default function Dashboard() {
    const {
        employees,
        departments,
        attendance
    } = useHR();
    const totalEmployees = employees.length;

    const totalDepartments = departments.length;

    const activeEmployees = employees.filter(
        (emp) => emp.status === "Active"
    ).length;

    const inactiveEmployees = employees.filter(
        (emp) => emp.status === "Inactive"
    ).length;

    const totalSalary = employees.reduce(
        (sum, emp) => sum + Number(emp.salary || 0),
        0
    );
    const recentEmployees = [...employees]
        .reverse()
        .slice(0, 5);


    return (
        <Box sx={{ p: 3 }}>
            <DashboardHeader />

            <Grid container spacing={3}>
                
                

                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
                    <DashboardCard
                        title="Employees"
                        value={totalEmployees}
                        icon={<PeopleIcon />}
                        color="#1976d2"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
                    <DashboardCard
                        title="Departments"
                        value={totalDepartments}
                        icon={<BusinessIcon />}
                        color="#7b1fa2"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
                    <DashboardCard
                        title="Active"
                        value={activeEmployees}
                        icon={<CheckCircleIcon />}
                        color="#2e7d32"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
                    <DashboardCard
                        title="Inactive"
                        value={inactiveEmployees}
                        icon={<CancelIcon />}
                        color="#d32f2f"
                    />
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2.4 }}>
                    <DashboardCard
                        title="Salary"
                        value={`PKR ${totalSalary.toLocaleString()}`}
                        icon={<PaymentsIcon />}
                        color="#ed6c02"
                    />
                </Grid>
                <DashboardCharts
                    employees={employees}
                    departments={departments}
                />
                <RecentEmployees
                    employees={recentEmployees}
                />

                <DepartmentSummary
                    departments={departments}
                    employees={employees}
                />
                
                

            </Grid>

        </Box>
    );
}