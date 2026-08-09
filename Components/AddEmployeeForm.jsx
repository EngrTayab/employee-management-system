import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { toast } from "react-toastify";

export default function AddEmployeeForm({ onAddEmployee, onCancel, initialData, isViewOnly, employees, departments }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        status: 'Active',
    });
    // Whenever initialData changes, sync it to the form fields!
    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                phone: initialData.phone || '',
                department: initialData.department || '',
                salary: initialData.salary || '',
                status: initialData.status || 'Active',
            });
        } else {
            // Reset if adding a new employee
            setFormData({
                name: '',
                email: '',
                phone: '',
                department: '',
                salary: '',
                status: 'Active',
            });
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            toast.warning('Name and Email are required!');
            return

        }
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
            toast.warning('Please enter a valid email address.');
            return
        }
        if (formData.salary && isNaN(formData.salary)) {
            toast.warning('Salary must be a number.');
            return
        }
        const isDuplicateEmail = employees.some((emp) => emp.email === formData.email && (!initialData || emp.id !== initialData.id));
        if (isDuplicateEmail) {
            toast.error('An employee with this email already exists.');
            return;
        }
        onAddEmployee(formData);
        setFormData({
            name: '',
            email: '',
            phone: '',
            department: '',
            salary: '',
            status: 'Active',
        });
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                paddingTop: 1,
                backgroundColor: '#f9f9f9',
                padding: 2,
                borderRadius: 2,
                boxShadow: 1,

            }}
        >
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                fullWidth
                disabled={isViewOnly}
            />
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                fullWidth
                disabled={isViewOnly || !!initialData}
            />
            <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                disabled={isViewOnly}
            />
            <TextField
                select
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                fullWidth
                required
                disabled={isViewOnly}
            >
                {departments.map((dept) => (
                    <MenuItem
                        key={dept.id}
                        value={dept.code}
                    >
                        {dept.code}
                    </MenuItem>
                ))}

            </TextField>
            <TextField
                label="Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                fullWidth
                
            />
            <TextField
                select
                label="Status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                fullWidth
            >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
            </TextField>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, marginTop: 1 }}>
                <Button onClick={onCancel} color={isViewOnly ? "primary" : "inherit"} variant={isViewOnly ? "contained" : "text"}>
                    {isViewOnly ? "Close" : "Cancel"}
                </Button>
                {!isViewOnly && (
                    <Button type="submit" variant="contained" color="primary">
                        {initialData ? "Update Employee" : "Save Employee"}
                    </Button>
                )}
            </Box>
        </Box>
    );
}