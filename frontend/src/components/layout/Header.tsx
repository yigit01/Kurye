import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Badge,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications,
  AccountCircle,
} from "@mui/icons-material";

interface HeaderProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ drawerWidth, handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationsMenuOpen = (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationsAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    // TODO: Implement logout logic
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Kurye Sistemi
        </Typography>
        <Box>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleNotificationsMenuOpen}
          >
            <Badge badgeContent={4} color="error">
              <Notifications />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profil</MenuItem>
          <MenuItem onClick={handleLogout}>Çıkış Yap</MenuItem>
        </Menu>

        <Menu
          anchorEl={notificationsAnchorEl}
          open={Boolean(notificationsAnchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            Yeni kargo teslim edildi
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Kurye atama bekleyen kargolar
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
