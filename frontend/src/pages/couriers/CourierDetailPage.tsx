import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Grid } from "@mui/material";
import CourierInfo from "../../components/couriers/CourierInfo";
import CourierDeliveries from "../../components/couriers/CourierDeliveries";

const CourierDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Kurye Detayı
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <CourierInfo id={id!} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <CourierDeliveries id={id!} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourierDetailPage;
