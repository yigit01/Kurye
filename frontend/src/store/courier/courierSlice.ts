import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { couriersApi } from "../../services/api";
import { Courier, CourierState } from "./types";

const initialState: CourierState = {
  couriers: null,
  courier: null,
  loading: false,
  error: null,
};

export const fetchCouriers = createAsyncThunk(
  "courier/fetchCouriers",
  async () => {
    const response = await couriersApi.getAll();
    return response.data;
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
  async (
    courierData: Omit<Courier, "id" | "createdAt" | "updatedAt" | "isActive">
  ) => {
    const response = await couriersApi.create(courierData);
    return response.data;
  }
);

export const updateCourier = createAsyncThunk(
  "courier/updateCourier",
  async ({ id, data }: { id: string; data: Partial<Courier> }) => {
    const response = await couriersApi.update(id, data);
    return response.data;
  }
);

export const deleteCourier = createAsyncThunk(
  "courier/deleteCourier",
  async (id: string) => {
    await couriersApi.delete(id);
    return id;
  }
);

export const fetchAvailableCouriers = createAsyncThunk(
  "courier/fetchAvailableCouriers",
  async (branchId: string) => {
    const response = await couriersApi.getAvailable(branchId);
    return response.data;
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
        state.error =
          action.error.message || "Kuryeler yüklenirken bir hata oluştu";
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
        if (state.couriers?.data) {
          state.couriers.data.push(action.payload);
        } else {
          state.couriers = {
            data: [action.payload],
            meta: {
              totalItems: 1,
              itemCount: 1,
              itemsPerPage: 10,
              totalPages: 1,
              currentPage: 1,
            },
          };
        }
        state.error = null;
      })
      .addCase(createCourier.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kurye oluşturulurken bir hata oluştu";
      })
      // Update Courier
      .addCase(updateCourier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourier.fulfilled, (state, action) => {
        state.loading = false;
        if (state.couriers?.data) {
          const index = state.couriers.data.findIndex(
            (c) => c.id === action.payload.id
          );
          if (index !== -1) {
            state.couriers.data[index] = action.payload;
          }
        }
        if (state.courier?.id === action.payload.id) {
          state.courier = action.payload;
        }
        state.error = null;
      })
      .addCase(updateCourier.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kurye güncellenirken bir hata oluştu";
      })
      // Delete Courier
      .addCase(deleteCourier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourier.fulfilled, (state, action) => {
        state.loading = false;
        if (state.couriers?.data) {
          state.couriers.data = state.couriers.data.filter(
            (c) => c.id !== action.payload
          );
        }
        if (state.courier?.id === action.payload) {
          state.courier = null;
        }
        state.error = null;
      })
      .addCase(deleteCourier.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kurye silinirken bir hata oluştu";
      })
      // Fetch available couriers
      .addCase(fetchAvailableCouriers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAvailableCouriers.fulfilled, (state, action) => {
        state.loading = false;
        state.couriers = action.payload;
      })
      .addCase(fetchAvailableCouriers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Müsait kuryeler yüklenirken bir hata oluştu";
      });
  },
});

export const { setLoading, setError, setCourier, setCouriers } =
  courierSlice.actions;
export default courierSlice.reducer;
