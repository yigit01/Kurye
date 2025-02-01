import React from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  LocalShipping,
  People,
  Business,
  CheckCircle,
} from "@mui/icons-material";
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
  { name: "Pazartesi", kargolar: 40, teslimEdilen: 24 },
  { name: "Salı", kargolar: 30, teslimEdilen: 13 },
  { name: "Çarşamba", kargolar: 20, teslimEdilen: 18 },
  { name: "Perşembe", kargolar: 27, teslimEdilen: 22 },
  { name: "Cuma", kargolar: 18, teslimEdilen: 15 },
  { name: "Cumartesi", kargolar: 23, teslimEdilen: 19 },
  { name: "Pazar", kargolar: 34, teslimEdilen: 32 },
];

const DashboardPage: React.FC = () => {
  const summaryCards = [
    {
      title: "Toplam Kargo",
      value: "156",
      icon: <LocalShipping />,
      color: "#1976d2",
    },
    {
      title: "Aktif Kuryeler",
      value: "12",
      icon: <People />,
      color: "#2e7d32",
    },
    {
      title: "Toplam Şube",
      value: "8",
      icon: <Business />,
      color: "#ed6c02",
    },
    {
      title: "Teslim Edilen",
      value: "143",
      icon: <CheckCircle />,
      color: "#9c27b0",
    },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {summaryCards.map((card) => (
          <Grid item xs={12} sm={6} md={3} key={card.title}>
            <Paper elevation={2}>
              <Box
                sx={{
                  p: 2,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: card.color,
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {card.icon}
                </Box>
                <Box>
                  <Typography color="textSecondary" variant="body2">
                    {card.title}
                  </Typography>
                  <Typography variant="h5">{card.value}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Haftalık Kargo İstatistikleri
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

export default DashboardPage;
