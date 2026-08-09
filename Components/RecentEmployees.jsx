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
    Chip,
} from "@mui/material";

export default function RecentEmployees({ employees }) {

    return (

        <Card sx={{ mt: 4 }}>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Recent Employees
                </Typography>

                <TableContainer component={Paper}>

                    <Table>

                        <TableHead>

                            <TableRow>

                                <TableCell>Name</TableCell>

                                <TableCell>Department</TableCell>

                                <TableCell>Status</TableCell>

                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {employees.map((employee) => (

                                <TableRow key={employee.id}>

                                    <TableCell>

                                        {employee.name}

                                    </TableCell>

                                    <TableCell>

                                        {employee.department}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={employee.status}
                                            color={
                                                employee.status === "Active"
                                                    ? "success"
                                                    : "error"
                                            }
                                        />

                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </TableContainer>

            </CardContent>

        </Card>

    );

}