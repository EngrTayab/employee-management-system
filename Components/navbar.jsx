import { useState, useEffect } from "react";

import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    IconButton,
    Badge,
    Avatar,
    TextField,
    InputAdornment,
    Menu,
    MenuItem,
    Divider,
    ListItemText
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHR } from "../src/context/HRContext";

export default function Navbar({ toggleSidebar }) {
    const { attendance } = useHR();
    const [currentTime, setCurrentTime] = useState(new Date());
    const [notificationAnchor, setNotificationAnchor] = useState(null);

    const [profileAnchor, setProfileAnchor] = useState(null);

    const notificationOpen = Boolean(notificationAnchor);

    const profileOpen = Boolean(profileAnchor);
    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);
    const handleNotificationClick = (event) => {

        setNotificationAnchor(event.currentTarget);

    };

    const handleNotificationClose = () => {

        setNotificationAnchor(null);

    };
    const handleProfileClick = (event) => {

        setProfileAnchor(event.currentTarget);

    };

    const handleProfileClose = () => {

        setProfileAnchor(null);

    };
    const latestNotifications = [...attendance]
        .reverse()
        .slice(0, 5);

    return (

        <AppBar
            position="sticky"
            elevation={2}
            sx={{
                bgcolor: "#fff",
                color: "#000",
            }}
        >

            <Toolbar>

                <IconButton
                    onClick={toggleSidebar}
                    sx={{ mr: 2 }}
                >
                    <MenuIcon />
                </IconButton>

                <Typography
                    variant="h5"
                    sx={{
                        color: "#1976d2",
                        fontWeight: "bold",
                    }}
                >
                    Employee Management System
                </Typography>

                <Box sx={{ flexGrow: 1 }} />

                <Typography
                    sx={{
                        mr: 3,
                        color: "#666",
                        fontSize: 14,
                    }}
                >
                    {currentTime.toLocaleDateString()} |{" "}
                    {currentTime.toLocaleTimeString()}
                </Typography>

                <TextField
                    size="small"
                    placeholder="Search..."

                    sx={{
                        width: 250,
                        mr: 3,
                        bgcolor: "#fff",
                    }}

                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <IconButton
                    color="inherit"
                    onClick={handleNotificationClick}
                >

                    <Badge
                        badgeContent={attendance.length}
                        color="error"
                    >

                        <NotificationsIcon />

                    </Badge>

                </IconButton>
                <Menu
                    anchorEl={notificationAnchor}
                    open={notificationOpen}
                    onClose={handleNotificationClose}
                    PaperProps={{
                        sx: {
                            width: 330,
                            mt: 1
                        }
                    }}
                >

                    <MenuItem disabled>

                        <Typography fontWeight="bold">

                            Notifications

                        </Typography>

                    </MenuItem>

                    <Divider />

                    {

                        latestNotifications.length === 0 ?

                            (

                                <MenuItem>

                                    No notifications

                                </MenuItem>

                            )

                            :

                            latestNotifications.map((item) => (

                                <MenuItem
                                    key={item.id}
                                    onClick={handleNotificationClose}
                                >

                                    <ListItemText

                                        primary={item.employee}

                                        secondary={`${item.status} • ${item.date}`}

                                    />

                                </MenuItem>

                            ))

                    }

                    <Divider />

                    <MenuItem
                        onClick={handleNotificationClose}
                        sx={{
                            justifyContent: "center",
                            color: "primary.main",
                            fontWeight: "bold"
                        }}
                    >

                        View All

                    </MenuItem>

                </Menu>

                <Box

                    onClick={handleProfileClick}

                    sx={{

                        display: "flex",

                        alignItems: "center",

                        cursor: "pointer",

                        gap: 1.5,

                    }}

                >

                    <Avatar
                        sx={{
                            bgcolor: "#1976d2",
                        }}
                    >
                        T
                    </Avatar>

                    <Box>

                        <Typography
                            fontWeight="bold"
                        >
                            Muhammad Tayyab
                        </Typography>

                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            HR Administrator
                        </Typography>

                    </Box>

                </Box>

                <Menu

                    anchorEl={profileAnchor}
                    open={profileOpen}
                    onClose={handleProfileClose}

                >

                    <MenuItem onClick={handleProfileClose}>

                        <PersonIcon sx={{ mr: 1 }} />

                        My Profile

                    </MenuItem>

                    <MenuItem onClick={handleProfileClose}>

                        <SettingsIcon sx={{ mr: 1 }} />

                        Settings

                    </MenuItem>

                    <Divider />

                    <MenuItem onClick={handleProfileClose}>

                        <DarkModeIcon sx={{ mr: 1 }} />

                        Dark Mode

                    </MenuItem>

                    <Divider />

                    <MenuItem
                        onClick={handleProfileClose}
                        sx={{ color: "red" }}
                    >

                        <LogoutIcon sx={{ mr: 1 }} />

                        Logout

                    </MenuItem>

                </Menu>

            </Toolbar>

        </AppBar>

    );

}