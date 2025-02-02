import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Paper, Button } from "@mui/material";
import ShipmentList from "../../components/shipments/ShipmentList";

const ShipmentsPage: React.FC = () => {
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Kargolar</Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Yeni Kargo
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <ShipmentList />
      </Paper>
    </Box>
  );
};

export default ShipmentsPage;
