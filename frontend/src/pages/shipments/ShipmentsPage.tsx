import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Paper, Button } from "@mui/material";
import ShipmentList from "../../components/shipments/ShipmentList";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchShipments, setShipments } from "../../store/slices/shipmentSlice";
import CreateShipmentModal from "@/components/shipments/CreateShipmentModal";

const ShipmentsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchShipments());

    // Cleanup function
    return () => {
      dispatch(setShipments([]));
    };
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    dispatch(fetchShipments());
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Kargolar</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Yeni Kargo
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <ShipmentList />
      </Paper>
      <CreateShipmentModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </Box>
  );
};

export default ShipmentsPage;
