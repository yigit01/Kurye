import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./styles/theme";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import LoginPage from "./pages/auth/LoginPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import ShipmentsPage from "./pages/shipments/ShipmentsPage";
import CouriersPage from "./pages/couriers/CouriersPage";
import CourierDetailPage from "./pages/couriers/CourierDetailPage";
import BranchesPage from "./pages/branches/BranchesPage";
import UsersPage from "./pages/users/UsersPage";
import UserDetailPage from "./pages/users/UserDetailPage";
import ReportsPage from "./pages/reports/ReportsPage";
import BranchDetailPage from "./pages/branches/BranchDetailPage";
import ShipmentDetailPage from "./pages/shipments/ShipmentDetailPage";
import AuthLayout from "./layouts/AuthLayout";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/shipments" element={<ShipmentsPage />} />
            <Route path="/shipments/:id" element={<ShipmentDetailPage />} />
            <Route path="/couriers" element={<CouriersPage />} />
            <Route path="/couriers/:id" element={<CourierDetailPage />} />
            <Route path="/branches" element={<BranchesPage />} />
            <Route path="/branches/:id" element={<BranchDetailPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/users/:id" element={<UserDetailPage />} />
            <Route path="/reports" element={<ReportsPage />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
