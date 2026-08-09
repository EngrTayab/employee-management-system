import { Box, Typography } from "@mui/material";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import { useState, useEffect } from "react";

export default function DashboardHeader() {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {

        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const date = currentTime.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const time = currentTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        
    });

    return (
        <Box
            sx={{
                background:
                    "linear-gradient(135deg,#1976d2,#42a5f5)",
                color: "white",
                p: 4,
                borderRadius: 3,
                mb: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: 5,
            }}
        >
            <Box textAlign="centre">

                <Typography variant="h4" fontWeight="bold">

                    Welcome Back
                    <WavingHandIcon
                        sx={{
                            ml: 1,
                            verticalAlign: "middle",
                        }}
                    />

                </Typography>

                <Typography variant="h6">

                    HR Management System

                </Typography>

            </Box>

            {/* <Box textAlign="right">

                <Typography variant="h6">

                    {date}

                </Typography>

                <Typography variant="h5">

                    {time}

                </Typography>

            </Box> */}

        </Box>
    );
}