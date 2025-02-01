import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import UserList from "../../components/users/UserList";

const UsersPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Kullanıcılar</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Yeni Kullanıcı
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <UserList />
      </Paper>
    </Box>
  );
};

export default UsersPage;
