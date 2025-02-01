import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import CourierList from "../../components/couriers/CourierList";

const CouriersPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Kuryeler</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Yeni Kurye
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <CourierList />
      </Paper>
    </Box>
  );
};

export default CouriersPage;
