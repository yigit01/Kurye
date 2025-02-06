//frontend\src\components\layout\Header.tsx
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Tooltip,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { logout } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";

interface HeaderProps {
  drawerWidth: number;
  handleDrawerToggle: () => void;
}

const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 65;

const Header: React.FC<HeaderProps> = ({ drawerWidth, handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <AppBar
      position="fixed"
      elevation={1}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        transition: (theme) =>
          theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        bgcolor: "background.paper",
        color: "text.primary",
        ...(drawerWidth === DRAWER_WIDTH && {
          marginLeft: DRAWER_WIDTH,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
        }),
        ...(drawerWidth === COLLAPSED_DRAWER_WIDTH && {
          marginLeft: COLLAPSED_DRAWER_WIDTH,
          width: `calc(100% - ${COLLAPSED_DRAWER_WIDTH}px)`,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{ marginRight: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="body2" sx={{ mr: 1 }}>
            {user?.fullName}
          </Typography>
          <Tooltip title="Hesap ayarları">
            <IconButton onClick={handleMenu} size="small" sx={{ padding: 0.5 }}>
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  bgcolor: "primary.main",
                  fontSize: "0.875rem",
                }}
              >
                {user?.fullName ? getInitials(user.fullName) : "U"}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              "& .MuiPaper-root": {
                minWidth: 180,
                boxShadow: (theme) => theme.shadows[3],
                border: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle2" noWrap>
                {user?.fullName}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {user?.email}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleClose} sx={{ gap: 2 }}>
              <PersonIcon fontSize="small" />
              <Typography variant="body2">Profil</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout} sx={{ gap: 2 }}>
              <LogoutIcon fontSize="small" />
              <Typography variant="body2">Çıkış Yap</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
