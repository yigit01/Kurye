import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Paper, Button } from "@mui/material";
import BranchList from "../../components/branches/BranchList";
import CreateBranchModal from "../../components/branches/CreateBranchModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchBranches } from "../../store/branch/branchSlice";

const BranchesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBranches({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    dispatch(fetchBranches({ page: 1, limit: 20 }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Şubeler</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Yeni Şube
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <BranchList />
      </Paper>
      <CreateBranchModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </Box>
  );
};

export default BranchesPage;
