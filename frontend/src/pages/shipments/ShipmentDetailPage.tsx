import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Grid } from "@mui/material";
import ShipmentInfo from "../../components/shipments/ShipmentInfo";
import ShipmentHistory from "../../components/shipments/ShipmentHistory";

const ShipmentDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Kargo Detayı
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <ShipmentInfo id={id!} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <ShipmentHistory id={id!} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShipmentDetailPage;
