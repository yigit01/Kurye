import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import PublicRoute from "../components/auth/PublicRoute";
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
import AuthLayout from "../layouts/AuthLayout";
import NotFoundPage from "../pages/NotFoundPage";
import CargoManagementPage from "../pages/cargo-management/CargoManagementPage";
import CargoHistoryPage from "../pages/cargo-management/CargoHistoryPage";
import CreateShipmentPage from "../pages/create-shipment/CreateShipmentPage";
import SmsCommunicationPage from "../pages/sms/SmsCommunicationPage";

// Error element component
const ErrorElement = () => (
  <ErrorBoundary>
    <div>Error occurred while loading this page.</div>
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorElement />,
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorElement />,
    children: [
      {
        index: true,
        element: (
          <ErrorBoundary>
            <DashboardPage />
          </ErrorBoundary>
        ),
        errorElement: <ErrorElement />,
      },
      {
        path: "dashboard",
        element: (
          <ErrorBoundary>
            <DashboardPage />
          </ErrorBoundary>
        ),
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
      //kargo yönetimi
      {
        path: "/cargo-management",
        element: <CargoManagementPage />, 
      },
      {
        path: "/create-shipment", 
        element: <CreateShipmentPage />,
      },
      {
        path: "/cargo-management/history",
        element: <CargoHistoryPage />,
      },

      {
        path: "/sms-communication",
        element: <SmsCommunicationPage />,
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
  // Not Found route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
