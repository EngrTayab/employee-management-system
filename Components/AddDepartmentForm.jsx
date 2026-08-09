import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function AddDepartmentForm({
    onAddDepartment,
    onCancel,
    initialData,
    isViewOnly,
    departments,
    employees
}) {

    const [formData, setFormData] = useState({
        name: "",
        code: "",
        manager: "",
        // employees: "",
        location: ""
    });

    useEffect(() => {

        if (initialData) {

            setFormData(initialData);

        } else {

            setFormData({
                name: "",
                code: "",
                manager: "",
                // employees: "",
                location: ""
            });

        }

    }, [initialData]);

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };
    console.log("Departments prop:", departments);

    const handleSubmit = (e) => {

        e.preventDefault();
        if (!formData.name || !formData.code || !formData.manager) {
            toast.warning("Name, Code, and Manager are required!");
            return;
        }

        // Duplicate check
        const isDuplicate = departments.some((dept) => {
            // Ignore current department while editing
            if (initialData && dept.id === initialData.id) {
                return false;
            }

            return (
                dept.name.toLowerCase() === formData.name.toLowerCase() ||
                dept.code.toLowerCase() === formData.code.toLowerCase()
            );
        });

        if (isDuplicate) {
            toast.error("Department Name or Code already exists!");
            return;
        }
        onAddDepartment(formData);
        setFormData({
            name: "",
            code: "",
            manager: "",
            employees: "",
            location: ""
        });

    };



    return (

        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                mt: 1
            }}
        >

            <TextField
                label="Department Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={isViewOnly|| !!initialData}
            />

            <TextField
                label="Department Code"
                name="code"
                value={ formData.code}
                onChange={handleChange}
                required
                disabled={isViewOnly || !!initialData}
            />

            <TextField
                label="Manager"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
                required
                disabled={isViewOnly}
            />

            {/* <TextField
                label="Employees"
                name="employees"
                value={formData.employees}
                onChange={handleChange}
                disabled={isViewOnly}
            /> */}
                


            <TextField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                disabled={isViewOnly}
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1
                }}
            >

                <Button onClick={onCancel}>
                    {isViewOnly ? "Close" : "Cancel"}
                </Button>

                {!isViewOnly &&

                    <Button
                        variant="contained"
                        type="submit"
                    >
                        {initialData ? "Update" : "Save"}
                    </Button>

                }

            </Box>

        </Box>

    );
}



// import { useState, useEffect } from "react";

// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";

// export default function AddDepartmentForm({
//     onAddDepartment,
//     onCancel,
//     initialData,
//     isViewOnly,
//     departments,
//     employees
// }) {
//     const [formData, setFormData] = useState({
//         name: "",
//         code: "",
//         manager: "",
//         location: ""
//     });

//     const [employeeCount, setEmployeeCount] = useState(0);

//     useEffect(() => {
//         if (initialData) {
//             setFormData(initialData);

//             // Calculate employee count for the initial department
//             const count = employees.filter(
//                 (employee) => employee.department === initialData.name
//             ).length;
//             setEmployeeCount(count);
//         } else {
//             setFormData({
//                 name: "",
//                 code: "",
//                 manager: "",
//                 location: ""
//             });
//             setEmployeeCount(0);
//         }
//     }, [initialData, employees]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData({
//             ...formData,
//             [name]: value
//         });

//         // Update employee count dynamically when department name changes
//         if (name === "name") {
//             const count = employees.filter(
//                 (employee) => employee.department === value
//             ).length;
//             setEmployeeCount(count);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (!formData.name || !formData.code || !formData.manager) {
//             alert("Name, Code, and Manager are required!");
//             return;
//         }

//         // Duplicate check
//         const isDuplicate = departments.some((dept) => {
//             // Ignore current department while editing
//             if (initialData && dept.id === initialData.id) {
//                 return false;
//             }

//             return (
//                 dept.name.toLowerCase() === formData.name.toLowerCase() ||
//                 dept.code.toLowerCase() === formData.code.toLowerCase()
//             );
//         });

//         if (isDuplicate) {
//             alert("Department Name or Code already exists!");
//             return;
//         }

//         // Add the employee count to the form data
//         const finalFormData = { ...formData, employeeCount };

//         onAddDepartment(finalFormData);
//         setFormData({
//             name: "",
//             code: "",
//             manager: "",
//             location: ""
//         });
//         setEmployeeCount(0);
//     };

//     return (
//         <Box
//             component="form"
//             onSubmit={handleSubmit}
//             sx={{
//                 display: "flex",
//                 flexDirection: "column",
//                 gap: 2,
//                 mt: 1
//             }}
//         >
//             <TextField
//                 label="Department Name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 disabled={isViewOnly || !!initialData}
//             />

//             <TextField
//                 label="Department Code"
//                 name="code"
//                 value={formData.code}
//                 onChange={handleChange}
//                 required
//                 disabled={isViewOnly || !!initialData}
//             />

//             <TextField
//                 label="Manager"
//                 name="manager"
//                 value={formData.manager}
//                 onChange={handleChange}
//                 required
//                 disabled={isViewOnly}
//             />

//             {/* Display the employee count dynamically */}
//             <TextField
//                 label="Employee Count"
//                 value={employeeCount}
//                 InputProps={{
//                     readOnly: true
//                 }}
//                 disabled
//             />

//             <TextField
//                 label="Location"
//                 name="location"
//                 value={formData.location}
//                 onChange={handleChange}
//                 disabled={isViewOnly}
//             />

//             <Box
//                 sx={{
//                     display: "flex",
//                     justifyContent: "flex-end",
//                     gap: 1
//                 }}
//             >
//                 <Button onClick={onCancel}>
//                     {isViewOnly ? "Close" : "Cancel"}
//                 </Button>

//                 {!isViewOnly && (
//                     <Button variant="contained" type="submit">
//                         {initialData ? "Update" : "Save"}
//                     </Button>
//                 )}
//             </Box>
//         </Box>
//     );
// }