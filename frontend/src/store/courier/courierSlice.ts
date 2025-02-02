import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CourierState, initialState, Courier } from "./types";
import { couriersApi } from "../../services/api";

export const fetchCouriers = createAsyncThunk(
  "courier/fetchCouriers",
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await couriersApi.getAll(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch couriers"
      );
    }
  }
);

export const fetchCourierById = createAsyncThunk(
  "courier/fetchCourierById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await couriersApi.getById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch courier"
      );
    }
  }
);

export const createCourier = createAsyncThunk(
  "courier/createCourier",
  async (data: Partial<Courier>, { rejectWithValue }) => {
    try {
      const response = await couriersApi.create(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create courier"
      );
    }
  }
);

export const updateCourier = createAsyncThunk(
  "courier/updateCourier",
  async (
    { id, data }: { id: string; data: Partial<Courier> },
    { rejectWithValue }
  ) => {
    try {
      const response = await couriersApi.update(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update courier"
      );
    }
  }
);

export const deleteCourier = createAsyncThunk(
  "courier/deleteCourier",
  async (id: string, { rejectWithValue }) => {
    try {
      await couriersApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete courier"
      );
    }
  }
);

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
  extraReducers: (builder) => {
    builder
      // Fetch Couriers
      .addCase(fetchCouriers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCouriers.fulfilled, (state, action) => {
        state.loading = false;
        state.couriers = action.payload;
        state.error = null;
      })
      .addCase(fetchCouriers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Courier by ID
      .addCase(fetchCourierById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourierById.fulfilled, (state, action) => {
        state.loading = false;
        state.courier = action.payload;
        state.error = null;
      })
      .addCase(fetchCourierById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Courier
      .addCase(createCourier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourier.fulfilled, (state, action) => {
        state.loading = false;
        state.couriers.push(action.payload);
        state.error = null;
      })
      .addCase(createCourier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Courier
      .addCase(updateCourier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourier.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.couriers.findIndex(
          (c) => c.id === action.payload.id
        );
        if (index !== -1) {
          state.couriers[index] = action.payload;
        }
        if (state.courier?.id === action.payload.id) {
          state.courier = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCourier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Courier
      .addCase(deleteCourier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourier.fulfilled, (state, action) => {
        state.loading = false;
        state.couriers = state.couriers.filter((c) => c.id !== action.payload);
        if (state.courier?.id === action.payload) {
          state.courier = null;
        }
        state.error = null;
      })
      .addCase(deleteCourier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading, setError, setCourier, setCouriers } =
  courierSlice.actions;
export default courierSlice.reducer;
