import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

export default function DepartmentSummary({

    departments,
    employees,

}) {

    return (

        <Card sx={{ mt: 4 }}>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Department Summary
                </Typography>

                <TableContainer component={Paper}>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>

                                    Department

                                </TableCell>

                                <TableCell>

                                    Manager

                                </TableCell>

                                <TableCell>

                                    Employees

                                </TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {departments.map((department) => {

                                const totalEmployees =
                                    employees.filter(
                                        (employee) =>
                                            employee.department ===
                                                department.code ||
                                            employee.department ===
                                                department.name
                                    ).length;

                                return (

                                    <TableRow key={department.id}>

                                        <TableCell>

                                            {department.name}

                                        </TableCell>

                                        <TableCell>

                                            {department.manager}

                                        </TableCell>

                                        <TableCell>

                                            {totalEmployees}

                                        </TableCell>

                                    </TableRow>

                                );

                            })}

                        </TableBody>

                    </Table>

                </TableContainer>

            </CardContent>

        </Card>

    );

}