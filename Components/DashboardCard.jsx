import { Card, CardContent, Typography, Box } from "@mui/material";

export default function DashboardCard({
    title,
    value,
    icon,
    color,
}) {
    return (
        <Card
            sx={{
                borderRadius: 3,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                },
            }}
        >
            <CardContent>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Box>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {title}
                        </Typography>

                        <Typography
                            variant="h4"
                            fontWeight="bold"
                            mt={1}
                        >
                            {value}
                        </Typography>

                    </Box>

                    <Box
                        sx={{
                            bgcolor: color,
                            color: "#fff",
                            p: 2,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {icon}
                    </Box>

                </Box>

            </CardContent>
        </Card>
    );
}