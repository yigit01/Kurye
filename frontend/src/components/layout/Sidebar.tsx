// src/components/layout/Sidebar.tsx
import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
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
import SettingsIcon from "@mui/icons-material/Settings";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
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
  
  const [cargoMenuOpen, setCargoMenuOpen] = useState<boolean>(false);

  // Ana menü öğeleri
  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Kargolar", icon: <LocalShippingIcon />, path: "/shipments" },
    { text: "Kuryeler", icon: <GroupIcon />, path: "/couriers" },
    { text: "Şubeler", icon: <BusinessIcon />, path: "/branches" },
    { text: "Raporlar", icon: <AssessmentIcon />, path: "/reports" },
  ];

  // Kargo Yönetimi nested menüsü; yeni alt öğe "Yeni Kargo Girişi" eklendi.
  const cargoMenu = {
    text: "Kargo Yönetimi",
    icon: <SettingsIcon />,
    children: [
      { text: "Atama", path: "/cargo-management" },
      { text: "Kargo Geçmişi", path: "/cargo-management/history" },
      { text: "Yeni Kargo Girişi", path: "/create-shipment" },
    ],
  };

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
          {menuItems.map((item) => (
            <Tooltip key={item.text} title={drawerWidth !== 240 ? item.text : ""} placement="right">
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
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
                    color: location.pathname === item.path ? "primary.main" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {drawerWidth === 240 && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: location.pathname === item.path ? 600 : 400,
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          ))}

          {/* Kargo Yönetimi Nested Menü */}
          <Tooltip title={drawerWidth !== 240 ? cargoMenu.text : ""} placement="right">
            <ListItemButton
              onClick={() => setCargoMenuOpen(!cargoMenuOpen)}
              sx={{
                minHeight: 48,
                px: 2.5,
                mx: 1,
                my: 0.5,
                borderRadius: 1,
                justifyContent: drawerWidth === 240 ? "initial" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: drawerWidth === 240 ? 2 : "auto",
                  justifyContent: "center",
                  color: cargoMenuOpen ? "primary.main" : "text.secondary",
                }}
              >
                {cargoMenu.icon}
              </ListItemIcon>
              {drawerWidth === 240 && (
                <ListItemText primary={cargoMenu.text} primaryTypographyProps={{ fontSize: 14 }} />
              )}
              {cargoMenuOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </Tooltip>
          <Collapse in={cargoMenuOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {cargoMenu.children.map((child) => (
                <ListItemButton
                  key={child.text}
                  sx={{ pl: 6 }}
                  onClick={() => navigate(child.path)}
                  selected={location.pathname === child.path}
                >
                  <ListItemText primary={child.text} primaryTypographyProps={{ fontSize: 13 }} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
        <Divider />
      </Box>
    </Drawer>
  );
};

export default Sidebar;
