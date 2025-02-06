//frontend\src\components\branches\BranchStats.tsx
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

interface BranchStatsProps {
  id: string;
}

const data = [
  { name: "Pazartesi", kargolar: 40, teslimEdilen: 35 },
  { name: "Salı", kargolar: 30, teslimEdilen: 28 },
  { name: "Çarşamba", kargolar: 20, teslimEdilen: 18 },
  { name: "Perşembe", kargolar: 27, teslimEdilen: 25 },
  { name: "Cuma", kargolar: 18, teslimEdilen: 15 },
  { name: "Cumartesi", kargolar: 23, teslimEdilen: 20 },
  { name: "Pazar", kargolar: 34, teslimEdilen: 30 },
];

const BranchStats: React.FC<BranchStatsProps> = ({ id }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Şube İstatistikleri
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Haftalık Kargo Dağılımı
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="kargolar" fill="#1976d2" name="Toplam Kargo" />
                <Bar
                  dataKey="teslimEdilen"
                  fill="#2e7d32"
                  name="Teslim Edilen"
                />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BranchStats;
