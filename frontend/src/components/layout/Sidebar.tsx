import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Box,
} from "@mui/material";
import {
  Dashboard,
  LocalShipping,
  People,
  Business,
  Assessment,
} from "@mui/icons-material";

interface SidebarProps {
  drawerWidth: number;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const menuItems = [
  { text: "Dashboard", icon: <Dashboard />, path: "/" },
  { text: "Kargolar", icon: <LocalShipping />, path: "/shipments" },
  { text: "Kuryeler", icon: <People />, path: "/couriers" },
  { text: "Şubeler", icon: <Business />, path: "/branches" },
  { text: "Kullanıcılar", icon: <People />, path: "/users" },
  { text: "Raporlar", icon: <Assessment />, path: "/reports" },
];

const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  mobileOpen,
  handleDrawerToggle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const drawer = (
    <Box>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (mobileOpen) {
                  handleDrawerToggle();
                }
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
