import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, Grid } from "@mui/material";
import UserInfo from "../../components/users/UserInfo";
import UserActivity from "../../components/users/UserActivity";

const UserDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Kullanıcı Detayı
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <UserInfo id={id!} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <UserActivity id={id!} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDetailPage;
