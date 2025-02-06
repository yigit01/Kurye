// src/components/layout/Sidebar.tsx

import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Toolbar,
  Typography,
  alpha,
  Tooltip,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GroupIcon from "@mui/icons-material/Group";
import BusinessIcon from "@mui/icons-material/Business";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings"; // Yeni ikon
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ drawerWidth, mobileOpen, handleDrawerToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  // Menü öğeleri
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Kargolar", icon: <LocalShippingIcon />, path: "/shipments" },
    { text: "Kuryeler", icon: <GroupIcon />, path: "/couriers" },
    { text: "Şubeler", icon: <BusinessIcon />, path: "/branches" },
    { text: "Raporlar", icon: <AssessmentIcon />, path: "/reports" },
    { text: "Kargo Yönetimi", icon: <SettingsIcon />, path: "/cargo-management" }, // Yeni öğe
  ];

  // Eğer admin ise ek menü öğesi
  if (user?.role === "admin") {
    menuItems.push({
      text: "Kullanıcılar",
      icon: <PeopleIcon />,
      path: "/users",
    });
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          transition: (theme) =>
            theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          boxSizing: "border-box",
          bgcolor: "background.default",
          overflowX: "hidden",
        },
      }}
    >
      <Toolbar
        sx={{
          px: 2,
          bgcolor: "primary.main",
          color: "primary.contrastText",
          minHeight: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: drawerWidth === 240 ? "flex-start" : "center",
        }}
      >
        {drawerWidth === 240 ? (
          <Typography variant="h6" noWrap component="div">
            Kurye Sistemi
          </Typography>
        ) : (
          <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>
            KS
          </Typography>
        )}
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List sx={{ pt: 1 }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <Tooltip key={item.text} title={drawerWidth !== 240 ? item.text : ""} placement="right">
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={isSelected}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    mx: 1,
                    my: 0.5,
                    borderRadius: 1,
                    justifyContent: drawerWidth === 240 ? "initial" : "center",
                    "&.Mui-selected": {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.1),
                      "&:hover": {
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.15),
                      },
                    },
                    "&:hover": {
                      bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: drawerWidth === 240 ? 2 : "auto",
                      justifyContent: "center",
                      color: isSelected ? "primary.main" : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {drawerWidth === 240 && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: isSelected ? 600 : 400,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            );
          })}
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
