import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Paper, Button } from "@mui/material";
import CourierList from "../../components/couriers/CourierList";
import CreateCourierModal from "../../components/couriers/CreateCourierModal";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { fetchCouriers } from "../../store/courier/courierSlice";

const CouriersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCouriers({ page: 1, limit: 20 }));
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSuccess = () => {
    dispatch(fetchCouriers({ page: 1, limit: 20 }));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4">Kuryeler</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenModal}
        >
          Yeni Kurye
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <CourierList />
      </Paper>
      <CreateCourierModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onSuccess={handleSuccess}
      />
    </Box>
  );
};

export default CouriersPage;
