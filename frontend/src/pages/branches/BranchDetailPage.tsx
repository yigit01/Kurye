import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Grid } from "@mui/material";
import BranchInfo from "../../components/branches/BranchInfo";
import BranchStats from "../../components/branches/BranchStats";

const BranchDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Şube Detayı
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <BranchInfo id={id!} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <BranchStats id={id!} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BranchDetailPage;
