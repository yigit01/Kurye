import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import courierReducer from "./courier/courierSlice";
import branchReducer from "./branch/branchSlice";
import shipmentReducer from "./shipment/shipmentSlice";
import { AuthState } from "./auth/types";
import { CourierState } from "./courier/types";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  courier: courierReducer,
  branch: branchReducer,
  shipment: shipmentReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
