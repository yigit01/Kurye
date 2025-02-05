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
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 65;

const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/" },
    { text: "Kargolar", icon: <LocalShippingIcon />, path: "/shipments" },
    { text: "Kuryeler", icon: <GroupIcon />, path: "/couriers" },
    { text: "Şubeler", icon: <BusinessIcon />, path: "/branches" },
    { text: "Raporlar", icon: <AssessmentIcon />, path: "/reports" },
  ];

  // Sadece admin kullanıcılar için kullanıcı yönetimi menüsü
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
          justifyContent:
            drawerWidth === DRAWER_WIDTH ? "flex-start" : "center",
        }}
      >
        {drawerWidth === DRAWER_WIDTH ? (
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
              <Tooltip
                key={item.text}
                title={drawerWidth !== DRAWER_WIDTH ? item.text : ""}
                placement="right"
              >
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={isSelected}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    mx: 1,
                    my: 0.5,
                    borderRadius: 1,
                    justifyContent:
                      drawerWidth === DRAWER_WIDTH ? "initial" : "center",
                    "&.Mui-selected": {
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.1),
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.primary.main, 0.15),
                      },
                    },
                    "&:hover": {
                      bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: drawerWidth === DRAWER_WIDTH ? 2 : "auto",
                      justifyContent: "center",
                      color: isSelected ? "primary.main" : "text.secondary",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {drawerWidth === DRAWER_WIDTH && (
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
