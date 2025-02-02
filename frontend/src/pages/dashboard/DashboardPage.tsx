import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import CreateEntityModals from "../../components/dashboard/CreateEntityModals";
import { Typography, Box } from "@mui/material";
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
import AnimatedDashboardCard from "../../components/dashboard/AnimatedDashboardCard";
import CustomTooltip from "../../components/dashboard/CustomTooltip";
import { motion } from "framer-motion";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventoryIcon from "@mui/icons-material/Inventory";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PaidIcon from "@mui/icons-material/Paid";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
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
      value: stats?.totalShipments || 0,
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
      icon: <LocalShippingIcon className="h-6 w-6 text-white" />,
    },
    {
      title: "Aktif Kargo",
      value: stats?.activeShipments || 0,
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      icon: <InventoryIcon className="h-6 w-6 text-white" />,
    },
    {
      title: "Teslim Edilen",
      value: stats?.deliveredShipments || 0,
      color: "bg-gradient-to-br from-green-500 to-green-600",
      icon: <CheckCircleIcon className="h-6 w-6 text-white" />,
    },
    {
      title: "Toplam Gelir",
      value: formatCurrency(stats?.totalRevenue || 0),
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
      icon: <PaidIcon className="h-6 w-6 text-white" />,
    },
  ];

  const formattedWeeklyStats =
    stats?.weeklyStats?.map((stat) => ({
      ...stat,
      date: formatDate(stat.date),
      formattedRevenue: formatCurrency(stat.revenue),
    })) || [];

  return (
    <div className="py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-semibold text-gray-900"
        >
          Dashboard
        </motion.h1>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="py-4">
          <div className="flex flex-row flex-wrap gap-4">
            {loading
              ? Array(4)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="flex-1 min-w-[250px]">
                      <DashboardCardSkeleton />
                    </div>
                  ))
              : summaryCards.map((card, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                    className={`${card.color} rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 hover:shadow-xl flex-1 min-w-[250px]`}
                  >
                    <div className="px-4 py-5 sm:p-6 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <dt className="text-sm md:text-base font-medium text-white opacity-90">
                          {card.title}
                        </dt>
                        {card.icon}
                      </div>
                      <div className="mt-2 md:mt-3 flex flex-row items-baseline gap-2 flex-nowrap">
                        <dd className="text-2xl md:text-3xl font-semibold text-white whitespace-nowrap">
                          {card.value}
                        </dd>
                        <span className="text-xs md:text-sm font-medium text-white opacity-90 whitespace-nowrap">
                          {card.title === "Toplam Gelir"
                            ? "Bu Ay"
                            : "Son 7 Gün"}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
          </div>

          {/* Weekly Stats Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="mt-8"
          >
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
              Haftalık İstatistikler
            </h3>
            {loading ? (
              <ChartSkeleton />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow">
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
                      activeDot={{
                        r: 6,
                        strokeWidth: 2,
                      }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2e7d32"
                      name="Gelir"
                      dot={{ strokeWidth: 2 }}
                      activeDot={{
                        r: 6,
                        strokeWidth: 2,
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
