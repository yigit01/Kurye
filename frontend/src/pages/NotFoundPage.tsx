import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { getCurrentUser } from "../store/auth/authSlice";
import Cookies from "js-cookie";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isChecking, setIsChecking] = useState(true);
  const { user } = useSelector((state: RootState) => state.auth);
  const token = Cookies.get("token");

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          await dispatch(getCurrentUser()).unwrap();
        } catch (error) {
          Cookies.remove("token");
        }
      }
      setIsChecking(false);
    };

    checkAuth();
  }, [dispatch, token]);

  if (isChecking) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Typography>Yükleniyor...</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          textAlign: "center",
          gap: 3,
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 100, color: "primary.main" }} />

        <Typography
          variant="h1"
          component="h1"
          sx={{ fontSize: "6rem", fontWeight: "bold", color: "primary.main" }}
        >
          404
        </Typography>

        <Typography
          variant="h5"
          component="h2"
          sx={{ mb: 2, color: "text.secondary" }}
        >
          Üzgünüz, aradığınız sayfayı bulamadık
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Aradığınız sayfa taşınmış, silinmiş veya hiç var olmamış olabilir.
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate(user ? "/dashboard" : "/login")}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
          }}
        >
          {user ? "Ana Sayfaya Dön" : "Giriş Yap"}
        </Button>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
