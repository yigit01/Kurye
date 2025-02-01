import React from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ocak", kargolar: 400, teslimEdilen: 350 },
  { name: "Şubat", kargolar: 300, teslimEdilen: 280 },
  { name: "Mart", kargolar: 200, teslimEdilen: 180 },
  { name: "Nisan", kargolar: 270, teslimEdilen: 250 },
  { name: "Mayıs", kargolar: 180, teslimEdilen: 150 },
  { name: "Haziran", kargolar: 230, teslimEdilen: 200 },
];

const ShipmentStats: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Kargo İstatistikleri
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Aylık Kargo Dağılımı
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="kargolar"
                  stroke="#1976d2"
                  name="Toplam Kargo"
                />
                <Line
                  type="monotone"
                  dataKey="teslimEdilen"
                  stroke="#2e7d32"
                  name="Teslim Edilen"
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ShipmentStats;
