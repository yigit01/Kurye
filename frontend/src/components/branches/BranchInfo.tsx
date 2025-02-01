import React from "react";
import { Grid, Typography, Divider, Chip } from "@mui/material";

interface BranchInfoProps {
  id: string;
}

const BranchInfo: React.FC<BranchInfoProps> = ({ id }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Şube Bilgileri
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          Şube Adı
        </Typography>
        <Typography variant="body1" gutterBottom>
          İstanbul Anadolu Yakası Şubesi
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          Durum
        </Typography>
        <Chip label="Aktif" color="success" size="small" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          İletişim
        </Typography>
        <Typography variant="body1">
          +90 216 123 4567
          <br />
          Kadıköy, İstanbul
        </Typography>
      </Grid>
    </Grid>
  );
};

export default BranchInfo;
