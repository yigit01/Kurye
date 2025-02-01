import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import BranchList from "../../components/branches/BranchList";

const BranchesPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Şubeler</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Yeni Şube
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <BranchList />
      </Paper>
    </Box>
  );
};

export default BranchesPage;
