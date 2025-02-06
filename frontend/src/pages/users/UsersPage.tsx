import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Paper, Button } from "@mui/material";
import UserList from "../../components/users/UserList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchUsers } from "../../store/user/userSlice";
import CreateUserModal from "@/components/users/CreateUserModal";

const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    dispatch(fetchUsers({ page: 1, limit: 20 }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Kullanıcılar</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Yeni Kullanıcı
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <UserList />
      </Paper>
      <CreateUserModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </Box>
  );
};

export default UsersPage;
