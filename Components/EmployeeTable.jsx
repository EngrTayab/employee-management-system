import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box'; // Added Box for layout spacing
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import { toast } from "react-toastify";


export default function EmployeeTable({ employees,handleEdit, handleDelete ,handleView}) {
    console.log(employees);
    // 2. State hooks to manage the alert text and visibility
    // const [showAlert, setShowAlert] = useState(false);
    // const [deletedName, setDeletedName] = useState('');


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>

            {/* 4. Display warning Alert conditionally at the top of the table */}
            {/* {showAlert && (
                <Alert
                    severity="warning"
                    onClose={() => setShowAlert(false)} // Adds an 'X' button to dismiss it
                >
                     Employee <strong>{deletedName}</strong> has been deleted.
                </Alert>
            )} */}



            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Department</th>
                        <th>Salary</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.phone}</td>
                            <td>{employee.department}</td>
                            <td>{employee.salary}</td>
                            {/* Status Column
                         <td>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                <Badge 
                                    variant="dot" 
                                    color={employee.status === 'Active' ? 'success' : 'error'} 
                                />
                                {employee.status}
                            </Box>
                        </td> */}
                            {/* Status text turns Green if 'Active', otherwise Red */}
                            <td>
                                <Box
                                    component="span"
                                    sx={{
                                        color: employee.status === 'Active' ? 'success.main' : 'error.main',
                                        fontWeight: 'bold' // Optional: makes it easier to read
                                    }}
                                >
                                    {employee.status}
                                </Box>
                            </td>

                            <td>{<ButtonGroup variant="contained" aria-label="Basic button group">
                                <Button color='secondary' onClick={() =>{ handleView(employee); toast.info(`Viewing ${employee.name}`);}} >View</Button>
                                <Button color='primary' onClick={() => {handleEdit(employee);toast.info(`Editing ${employee.name}`);}}>Edit</Button>
                                <Button color="error" onClick={() => handleDelete(employee)}>Delete</Button>
                            </ButtonGroup>}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Box>
    );
}