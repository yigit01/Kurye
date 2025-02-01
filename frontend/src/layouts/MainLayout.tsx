import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Dashboard,
  LocalShipping,
  People,
  Business,
  Assessment,
  Person,
} from "@mui/icons-material";
import Header from "../components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";

const drawerWidth = 240;

const MainLayout: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          mt: 8,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
