import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import DashboardPage from "@/pages/dashboard/DashboardPage";
import ShipmentsPage from "@/pages/shipments/ShipmentsPage";
import ShipmentDetailPage from "@/pages/shipments/ShipmentDetailPage";
import CouriersPage from "@/pages/couriers/CouriersPage";
import CourierDetailPage from "@/pages/couriers/CourierDetailPage";
import BranchesPage from "@/pages/branches/BranchesPage";
import BranchDetailPage from "@/pages/branches/BranchDetailPage";
import UsersPage from "@/pages/users/UsersPage";
import UserDetailPage from "@/pages/users/UserDetailPage";
import ReportsPage from "@/pages/reports/ReportsPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      // Shipments Routes
      {
        path: "/shipments",
        element: <ShipmentsPage />,
      },
      {
        path: "/shipments/:id",
        element: <ShipmentDetailPage />,
      },
      // Couriers Routes
      {
        path: "/couriers",
        element: <CouriersPage />,
      },
      {
        path: "/couriers/:id",
        element: <CourierDetailPage />,
      },
      // Branches Routes
      {
        path: "/branches",
        element: <BranchesPage />,
      },
      {
        path: "/branches/:id",
        element: <BranchDetailPage />,
      },
      // Users Routes
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/users/:id",
        element: <UserDetailPage />,
      },
      // Reports Route
      {
        path: "/reports",
        element: <ReportsPage />,
      },
    ],
  },
]);

export default router;
