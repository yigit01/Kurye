import React from "react";
import { Box, Typography, Paper, Grid } from "@mui/material";
import ShipmentStats from "../../components/reports/ShipmentStats";
import CourierStats from "../../components/reports/CourierStats";
import BranchStats from "../../components/reports/BranchStats";

const ReportsPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Raporlar
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <ShipmentStats />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <CourierStats />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <BranchStats />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReportsPage;
