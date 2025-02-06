import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { Typography, Box, Grid, Paper } from "@mui/material";
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
import { fetchDashboardStats } from "../../store/dashboard/dashboardSlice";
import { formatDate, formatCurrency } from "../../utils/date";
import DashboardCardSkeleton from "../../components/dashboard/DashboardCardSkeleton";
import ChartSkeleton from "../../components/dashboard/ChartSkeleton";
import CustomTooltip from "../../components/dashboard/CustomTooltip";
import { motion } from "framer-motion";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaidIcon from "@mui/icons-material/Paid";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      if (isSubscribed && !stats) {
        await dispatch(fetchDashboardStats());
      }
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, [dispatch, stats]);

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  const summaryCards = [
    {
      title: "Toplam Kargo",
      value: stats?.totalShipments || 0,
      color: "#1976d2", // Mavi tonu
      icon: <LocalShippingIcon style={{ color: "white" }} />,
    },
    {
      title: "Aktif Kargo",
      value: stats?.activeShipments || 0,
      color: "#ff9800", // Turuncu tonu
      icon: <InventoryIcon style={{ color: "white" }} />,
    },
    {
      title: "Teslim Edilen",
      value: stats?.deliveredShipments || 0,
      color: "#4caf50", // Yeşil ton
      icon: <CheckCircleIcon style={{ color: "white" }} />,
    },
    {
      title: "Toplam Gelir",
      value: formatCurrency(stats?.totalRevenue || 0),
      color: "#9c27b0", // Mor ton
      icon: <PaidIcon style={{ color: "white" }} />,
    },
  ];

  const formattedWeeklyStats =
    stats?.weeklyStats?.map((stat) => ({
      ...stat,
      date: formatDate(stat.date),
      formattedRevenue: formatCurrency(stat.revenue),
    })) || [];

  return (
    <Box py={6} px={2}>
      {/* Başlık */}
      <Box maxWidth="xl" mx="auto" mb={4}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}
        >
          Dashboard
        </motion.h1>
      </Box>

      <Box maxWidth="xl" mx="auto">
        {/* Özet Kartlar */}
        <Grid container spacing={2}>
          {loading
            ? Array(4)
                .fill(0)
                .map((_, index) => (
                  <Grid item xs={12} sm={6} md={3} key={index}>
                    <DashboardCardSkeleton />
                  </Grid>
                ))
            : summaryCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Paper
                      sx={{
                        background: card.color,
                        color: "white",
                        borderRadius: "16px",
                        padding: 2,
                        minHeight: "150px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                      elevation={4}
                    >
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                          {card.title}
                        </Typography>
                        {card.icon}
                      </Box>
                      <Box display="flex" alignItems="baseline" mt={2}>
                        <Typography variant="h4">
                          {card.value}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9, ml: 1 }}>
                          {card.title === "Toplam Gelir" ? "Bu Ay" : "Son 7 Gün"}
                        </Typography>
                      </Box>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
        </Grid>

        {/* Haftalık İstatistikler Grafiği */}
        <Box mt={4}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Typography variant="h6" gutterBottom>
              Haftalık İstatistikler
            </Typography>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <Paper sx={{ p: 3 }}>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={formattedWeeklyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="shipments"
                      stroke="#1976d2"
                      name="Kargo Sayısı"
                      dot={{ strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#4caf50"
                      name="Gelir"
                      dot={{ strokeWidth: 2 }}
                      activeDot={{ r: 6, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            )}
          </motion.div>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardPage;
