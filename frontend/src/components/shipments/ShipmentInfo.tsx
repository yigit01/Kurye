//frontend\src\components\shipments\ShipmentInfo.tsx
import React from "react";
import { Grid, Typography, Divider } from "@mui/material";

interface ShipmentInfoProps {
  id: string;
}

const ShipmentInfo: React.FC<ShipmentInfoProps> = ({ id }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Kargo Bilgileri
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Takip Kodu
        </Typography>
        <Typography variant="body1" gutterBottom>
          {/* TODO: Add actual tracking code */}
          TR123456789
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2" color="text.secondary">
          Durum
        </Typography>
        <Typography variant="body1" gutterBottom>
          {/* TODO: Add actual status */}
          Yolda
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          Alıcı Bilgileri
        </Typography>
        <Typography variant="body1" gutterBottom>
          {/* TODO: Add actual recipient info */}
          Ahmet Yılmaz
          <br />
          İstanbul, Türkiye
        </Typography>
      </Grid>
    </Grid>
  );
};

export default ShipmentInfo;
