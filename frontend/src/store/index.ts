import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import courierReducer from "./courier/courierSlice";
import branchReducer from "./slices/branchSlice";
import shipmentReducer from "./shipment/shipmentSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import { AuthState } from "./auth/types";
import { CourierState } from "./courier/types";
import { combineReducers } from "redux";

const rootReducer = {
  auth: authReducer,
  courier: courierReducer,
  branch: branchReducer,
  shipment: shipmentReducer,
  dashboard: dashboardReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
