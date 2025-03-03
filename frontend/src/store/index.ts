import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import courierReducer from "./courier/courierSlice";
import branchReducer from "./branch/branchSlice";
import shipmentReducer from "./shipment/shipmentSlice";
import dashboardReducer from "./dashboard/dashboardSlice";
import userReducer from "./user/userSlice";
import { AuthState } from "./auth/types";
import { CourierState } from "./courier/types";
import { combineReducers } from "redux";

const rootReducer = {
  auth: authReducer,
  courier: courierReducer,
  branch: branchReducer,
  shipment: shipmentReducer,
  dashboard: dashboardReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
