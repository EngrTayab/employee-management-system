import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { toast } from "react-toastify";

export default function AttendanceTable({
    attendance,
    handleView,
    handleEdit,
    
}) {

    return (

        <Box sx={{ width: "100%", overflowX: "auto" }}>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Date</th>
                        <th>Check In</th>
                        <th>Check Out</th>
                        <th>Hours</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {attendance.length === 0 ? (

                        <tr>

                            <td
                                colSpan={9}
                                style={{
                                    textAlign: "center",
                                    padding: "20px"
                                }}
                            >
                                No attendance records found.
                            </td>

                        </tr>

                    ) : (

                        attendance.map((item) => (

                            <tr key={item.id}>

                                <td>{item.id}</td>

                                <td>{item.employee}</td>

                                <td>{item.department}</td>

                                <td>{item.date}</td>

                                <td>{item.checkIn || "-"}</td>

                                <td>{item.checkOut || "-"}</td>

                                <td>{item.hours}</td>

                                <td>

                                    <Chip
                                        label={item.status}
                                        color={
                                            item.status === "Present"
                                                ? "success"
                                                : item.status === "Absent"
                                                ? "error"
                                                : "warning"
                                        }
                                        size="small"
                                    />

                                </td>

                                <td>

                                    <ButtonGroup
                                        variant="contained"
                                    >

                                        <Button
                                            color="secondary"
                                            onClick={() => {

                                                handleView(item);

                                                toast.info(
                                                    `Viewing ${item.employee}`
                                                );

                                            }}
                                        >
                                            View
                                        </Button>

                                        <Button
                                            color="primary"
                                            onClick={() => {

                                                handleEdit(item);

                                                toast.info(
                                                    `Editing ${item.employee}`
                                                );

                                            }}
                                        >
                                            Edit
                                        </Button>

                                       

                                    </ButtonGroup>

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </Box>

    );

}