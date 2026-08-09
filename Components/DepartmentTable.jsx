import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import  { toast } from "react-toastify";

export default function DepartmentTable({
    departments,
    employees,
    handleDelete,
    handleEdit,
    handleView
}) {

    return (

        <table>

            <thead>

                <tr>

                    <th>ID</th>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Manager</th>
                    <th>Employees</th>
                    <th>Location</th>
                    <th>Actions</th>

                </tr>

            </thead>

            <tbody>

                {departments.map((department) => {

                    const employeeCount = employees.filter(
                        (employee) => employee.department === department.code
                    ).length;

                    return (
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.name}</td>
                            <td>{department.code}</td>
                            <td>{department.manager}</td>

                            {/* Dynamic Employee Count */}
                            <td>{employeeCount}</td>

                            <td>{department.location}</td>

                            <td>

                                <ButtonGroup>

                                    <Button
                                        color="secondary"
                                        onClick={() => {handleView(department); toast.info(`Viewing ${department.name}`);}}
                                    >
                                        View
                                    </Button>

                                    <Button
                                        color="primary"
                                        onClick={() => {handleEdit(department);toast.info(`Editing ${department.name}`);}}
                                    >
                                        Edit
                                    </Button>

                                    <Button
                                        color="error"
                                        onClick={() => {handleDelete(department)}}
                                    >
                                        Delete
                                    </Button>

                                </ButtonGroup>

                            </td>

                        </tr>
                    );
                })}

            </tbody>

        </table>

    );
}