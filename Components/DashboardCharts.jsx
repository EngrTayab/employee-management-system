import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";
import CountUp from "react-countup";

import {
    Grid,
    Card,
    CardContent,
    Typography,
} from "@mui/material";

export default function DashboardCharts({
    employees,
    departments,
}) {

    const pieData = [
        {
            name: "Active",
            value: employees.filter(
                (emp) => emp.status === "Active"
            ).length,
        },
        {
            name: "Inactive",
            value: employees.filter(
                (emp) => emp.status === "Inactive"
            ).length,
        },
    ];

    const barData = departments.map((department) => ({
        name: department.code,

        employees: employees.filter(
            (employee) =>
                employee.department === department.code ||
                employee.department === department.name
        ).length,
    }));

    const COLORS = [
        "#2e7d32",
        "#d32f2f",
    ];

    return (
        <Grid
            container
            spacing={3}
            sx={{ mt: 2 }}
        >

            <Grid size={{ xs: 12, md: 6 }}>

                <Card>

                    <CardContent>

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Employee Status
                        </Typography>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={pieData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                >

                                    {pieData.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index]}
                                        />

                                    ))}

                                </Pie>

                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </CardContent>

                </Card>

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <Card>

                    <CardContent>

                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            Employees per Department
                        </Typography>

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={barData}
                            >

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="employees"
                                    fill="#1976d2"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </CardContent>

                </Card>

            </Grid>

        </Grid>
    );
}