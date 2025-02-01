import React from "react";
import { Grid, Typography, Divider, Chip } from "@mui/material";

interface UserInfoProps {
  id: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ id }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6" gutterBottom>
          Kullanıcı Bilgileri
        </Typography>
        <Divider sx={{ mb: 2 }} />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          Ad Soyad
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ahmet Yılmaz
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          Rol
        </Typography>
        <Chip label="Kurye" color="primary" size="small" />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          İletişim
        </Typography>
        <Typography variant="body1">
          ahmet@example.com
          <br />
          +90 555 123 4567
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2" color="text.secondary">
          Durum
        </Typography>
        <Chip label="Aktif" color="success" size="small" />
      </Grid>
    </Grid>
  );
};

export default UserInfo;
