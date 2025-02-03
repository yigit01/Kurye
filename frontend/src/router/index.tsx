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
import ErrorBoundary from "../components/common/ErrorBoundary";

// Error element component
const ErrorElement = () => (
  <ErrorBoundary>
    <div>Error occurred while loading this page.</div>
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorElement />,
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <DashboardPage />,
        errorElement: <ErrorElement />,
      },
      {
        path: "/dashboard",
        element: <DashboardPage />,
        errorElement: <ErrorElement />,
      },
      // Shipments Routes
      {
        path: "/shipments",
        element: (
          <ErrorBoundary>
            <ShipmentsPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "/shipments/:id",
        element: (
          <ErrorBoundary>
            <ShipmentDetailPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
      // Couriers Routes
      {
        path: "/couriers",
        element: (
          <ErrorBoundary>
            <CouriersPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "/couriers/:id",
        element: (
          <ErrorBoundary>
            <CourierDetailPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
      // Branches Routes
      {
        path: "/branches",
        element: (
          <ErrorBoundary>
            <BranchesPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "/branches/:id",
        element: (
          <ErrorBoundary>
            <BranchDetailPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
      // Users Routes
      {
        path: "/users",
        element: (
          <ErrorBoundary>
            <UsersPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "/users/:id",
        element: (
          <ErrorBoundary>
            <UserDetailPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
      // Reports Route
      {
        path: "/reports",
        element: (
          <ErrorBoundary>
            <ReportsPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
    ],
  },
]);

export default router;
