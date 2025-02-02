import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dashboardApi } from "../../services/api";

interface CourierStats {
  courierId: string;
  courierName: string;
  deliveredCount: number;
  failedCount: number;
  successRate: number;
}

interface BranchStats {
  branchId: string;
  branchName: string;
  processedCount: number;
  deliveredCount: number;
  throughputRate: number;
}

interface DashboardStats {
  totalShipments: number;
  activeShipments: number;
  deliveredShipments: number;
  totalRevenue: number;
  weeklyStats: {
    date: string;
    shipments: number;
    revenue: number;
  }[];
  courierStats: CourierStats[];
  branchStats: BranchStats[];
}

interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  stats: null,
  loading: false,
  error: null,
};

export const fetchDashboardStats = createAsyncThunk(
  "dashboard/fetchStats",
  async () => {
    const response = await dashboardApi.getStats();
    return response;
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
        state.error =
          action.error.message || "İstatistikler yüklenirken bir hata oluştu";
      });
  },
});

export const { setLoading, setError } = dashboardSlice.actions;
export default dashboardSlice.reducer;
