import {
    Card,
    CardContent,
    Typography,
    Grid,
    Box,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PaymentsIcon from "@mui/icons-material/Payments";
import FactCheckIcon from "@mui/icons-material/FactCheck";

export default function QuickActions() {

    const navigate = useNavigate();

    const actions = [
        {
            title: "Employees",
            subtitle: "Manage Employees",
            icon: <PersonAddAlt1Icon sx={{ fontSize: 45 }} />,
            color: "#1976d2",
            route: "/employes",
        },
        {
            title: "Departments",
            subtitle: "Manage Departments",
            icon: <ApartmentIcon sx={{ fontSize: 45 }} />,
            color: "#7b1fa2",
            route: "/departments",
        },
        {
            title: "Salary",
            subtitle: "Salary Records",
            icon: <PaymentsIcon sx={{ fontSize: 45 }} />,
            color: "#2e7d32",
            route: "/salary",
        },
        {
            title: "Attendance",
            subtitle: "Employee Attendance",
            icon: <FactCheckIcon sx={{ fontSize: 45 }} />,
            color: "#ed6c02",
            route: "/attendence",
        },
    ];

    return (

        <Box sx={{ mt: 5 }}>

            <Typography
                variant="h5"
                fontWeight="bold"
                mb={3}
            >
                Quick Actions
            </Typography>

            <Grid container spacing={3}>

                {actions.map((action) => (

                    <Grid
                        key={action.title}
                        size={{ xs: 12, sm: 6, md: 3 }}
                    >

                        <Card

                            onClick={() => navigate(action.route)}

                            sx={{
                                cursor: "pointer",
                                borderRadius: 4,
                                transition: ".3s",

                                "&:hover": {

                                    transform: "translateY(-10px)",

                                    boxShadow: 8,

                                },
                            }}
                        >

                            <CardContent>

                                <Box

                                    sx={{

                                        display: "flex",

                                        flexDirection: "column",

                                        alignItems: "center",

                                        py: 3,

                                    }}

                                >

                                    <Box

                                        sx={{

                                            width: 80,

                                            height: 80,

                                            borderRadius: "50%",

                                            bgcolor: action.color,

                                            color: "white",

                                            display: "flex",

                                            alignItems: "center",

                                            justifyContent: "center",

                                            mb: 2,

                                        }}

                                    >

                                        {action.icon}

                                    </Box>

                                    <Typography

                                        variant="h6"

                                        fontWeight="bold"

                                    >

                                        {action.title}

                                    </Typography>

                                    <Typography

                                        color="text.secondary"

                                    >

                                        {action.subtitle}

                                    </Typography>

                                </Box>

                            </CardContent>

                        </Card>

                    </Grid>

                ))}

            </Grid>

        </Box>

    );

}