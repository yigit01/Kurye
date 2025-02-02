import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { DashboardState, initialState } from "./types";
import { dashboardApi } from "../../services/api";

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getStats();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard stats"
      );
    }
  }
);

export const fetchWeeklyStats = createAsyncThunk(
  "dashboard/fetchWeeklyStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await dashboardApi.getWeeklyStats();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch weekly stats"
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Dashboard Stats
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
        state.error = null;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Weekly Stats
      .addCase(fetchWeeklyStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeeklyStats.fulfilled, (state, action) => {
        state.loading = false;
        state.weeklyStats = action.payload;
        state.error = null;
      })
      .addCase(fetchWeeklyStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
