import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

export default function LeaveRequestTable({
    leaveRequests,
    handleApprove,
    handleReject,
}) {

    return (

        <Box sx={{ width: "100%" }}>

            <table>

                <thead>

                    <tr>

                        <th>ID</th>
                        <th>Employee</th>
                        <th>Department</th>
                        <th>Leave Date</th>
                        <th>Reason</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {leaveRequests.length === 0 ? (

                        <tr>

                            <td
                                colSpan="7"
                                style={{
                                    textAlign: "center",
                                    padding: "20px",
                                }}
                            >
                                No Leave Requests Found
                            </td>

                        </tr>

                    ) : (

                        leaveRequests.map((leave) => (

                            <tr key={leave.id}>

                                <td>{leave.id}</td>

                                <td>{leave.employee}</td>

                                <td>{leave.department}</td>

                                <td>{leave.date}</td>

                                <td>{leave.reason}</td>

                                <td>

                                    {leave.status === "Pending" && (
                                        <Chip
                                            label="Pending"
                                            color="warning"
                                            size="small"
                                        />
                                    )}

                                    {leave.status === "Approved" && (
                                        <Chip
                                            label="Approved"
                                            color="success"
                                            size="small"
                                        />
                                    )}

                                    {leave.status === "Rejected" && (
                                        <Chip
                                            label="Rejected"
                                            color="error"
                                            size="small"
                                        />
                                    )}

                                </td>

                                <td>

                                    {leave.status === "Pending" ? (

                                        <ButtonGroup>

                                            <Button
                                                color="success"
                                                onClick={() => {

                                                    handleApprove(leave.id);

                                                    toast.success(
                                                        `${leave.employee}'s leave approved`
                                                    );

                                                }}
                                            >
                                                Approve
                                            </Button>

                                            <Button
                                                color="error"
                                                onClick={() => {

                                                    handleReject(leave.id);

                                                    toast.error(
                                                        `${leave.employee}'s leave rejected`
                                                    );

                                                }}
                                            >
                                                Reject
                                            </Button>

                                        </ButtonGroup>

                                    ) : (

                                        <span>Completed</span>

                                    )}

                                </td>

                            </tr>

                        ))

                    )}

                </tbody>

            </table>

        </Box>

    );

}