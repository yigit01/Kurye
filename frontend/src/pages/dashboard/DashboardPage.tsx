import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, CircularProgress } from "@mui/material";
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
import axios from "axios";

interface DashboardStats {
  totalShipments: number;
  deliveredShipments: number;
  activeCouriers: number;
  totalBranches: number;
}

interface WeeklyStats {
  name: string;
  shipments: number;
  delivered: number;
}

const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const today = new Date();
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Fetch shipment stats
        const [shipmentStats, courierStats, branchStats] = await Promise.all([
          axios.get(
            `/api/reports/shipments?startDate=${lastWeek.toISOString()}&endDate=${today.toISOString()}`
          ),
          axios.get(
            `/api/reports/couriers?startDate=${lastWeek.toISOString()}&endDate=${today.toISOString()}`
          ),
          axios.get(
            `/api/reports/branches?startDate=${lastWeek.toISOString()}&endDate=${today.toISOString()}`
          ),
        ]);

        // Process stats for dashboard summary
        const dashboardStats: DashboardStats = {
          totalShipments: shipmentStats.data.totalShipments || 0,
          deliveredShipments: shipmentStats.data.deliveredShipments || 0,
          activeCouriers: courierStats.data.activeCouriers || 0,
          totalBranches: branchStats.data.totalBranches || 0,
        };

        setStats(dashboardStats);

        // Process weekly stats
        const weeklyData = shipmentStats.data.dailyStats || [];
        const processedWeeklyStats = weeklyData.map((day: any) => ({
          name: new Date(day.date).toLocaleDateString("tr-TR", {
            weekday: "short",
          }),
          shipments: day.totalShipments,
          delivered: day.deliveredShipments,
        }));

        setWeeklyStats(processedWeeklyStats);
        setError(null);
      } catch (err) {
        setError("Veriler yüklenirken bir hata oluştu.");
        console.error("Dashboard data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const summaryCards = [
    {
      title: "Toplam Kargo",
      value: stats?.totalShipments.toString() || "0",
      icon: <LocalShipping />,
      color: "#1976d2",
    },
    {
      title: "Aktif Kuryeler",
      value: stats?.activeCouriers.toString() || "0",
      icon: <People />,
      color: "#2e7d32",
    },
    {
      title: "Toplam Şube",
      value: stats?.totalBranches.toString() || "0",
      icon: <Business />,
      color: "#ed6c02",
    },
    {
      title: "Teslim Edilen",
      value: stats?.deliveredShipments.toString() || "0",
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
              <LineChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="shipments"
                  stroke="#1976d2"
                  name="Toplam Kargo"
                />
                <Line
                  type="monotone"
                  dataKey="delivered"
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
