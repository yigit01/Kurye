import { createSlice } from "@reduxjs/toolkit";
import { CourierState, initialState } from "./types";

const courierSlice = createSlice({
  name: "courier",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCourier: (state, action) => {
      state.courier = action.payload;
    },
    setCouriers: (state, action) => {
      state.couriers = action.payload;
    },
  },
});

export const { setLoading, setError, setCourier, setCouriers } =
  courierSlice.actions;
export default courierSlice.reducer;
