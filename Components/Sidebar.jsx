import { useState } from "react";
import { NavLink } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import PaymentsIcon from "@mui/icons-material/Payments";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import EventBusyIcon from "@mui/icons-material/EventBusy";

import "./Sidebar.css";

export default function Sidebar({ open }) {

    

    const menu = [
        { name: "Dashboard", path: "/dashboard", icon: <DashboardIcon /> },
        { name: "Employees", path: "/employes", icon: <PeopleIcon /> },
        { name: "Departments", path: "/departments", icon: <BusinessIcon /> },
        { name: "Salary", path: "/salary", icon: <PaymentsIcon /> },
        { name: "Attendance", path: "/attendence", icon: <FactCheckIcon /> },
        { name: "Leave Requests", path: "/leave-requests", icon: <EventBusyIcon /> },
    ];

    return (
        <div className={open ? "sidebar open" : "sidebar"}>

            <div
                className="menu-btn"
                
            >
                <MenuIcon />
                {open && <span>HRMS</span>}
            </div>

            {menu.map((item) => (

                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        isActive ? "menu active" : "menu"
                    }
                >
                    {item.icon}

                    {open && <span>{item.name}</span>}

                </NavLink>

            ))}

        </div>
    );
}