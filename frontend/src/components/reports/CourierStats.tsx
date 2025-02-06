//frontend\src\components\reports\CourierStats.tsx
import React from "react";
import { Grid, Typography, Box, Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Ahmet", teslimat: 45, basari: 98 },
  { name: "Mehmet", teslimat: 38, basari: 95 },
  { name: "Ayşe", teslimat: 42, basari: 97 },
  { name: "Fatma", teslimat: 35, basari: 94 },
  { name: "Ali", teslimat: 40, basari: 96 },
];

const CourierStats: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Kurye Performansı
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Haftalık Teslimat Performansı
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="teslimat"
                  fill="#1976d2"
                  name="Teslimat Sayısı"
                />
                <Bar
                  yAxisId="right"
                  dataKey="basari"
                  fill="#2e7d32"
                  name="Başarı Oranı (%)"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourierStats;
