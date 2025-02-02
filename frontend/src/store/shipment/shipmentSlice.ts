import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ShipmentState,
  initialState,
  CreateShipmentDto,
  UpdateShipmentDto,
  TransferShipmentDto,
} from "./types";
import { shipmentsApi } from "../../services/api";

export const fetchShipments = createAsyncThunk(
  "shipment/fetchShipments",
  async (
    params: { page?: number; limit?: number } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await shipmentsApi.getAll(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch shipments"
      );
    }
  }
);

export const fetchShipmentById = createAsyncThunk(
  "shipment/fetchShipmentById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await shipmentsApi.getById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch shipment"
      );
    }
  }
);

export const fetchShipmentByTrackingCode = createAsyncThunk(
  "shipment/fetchShipmentByTrackingCode",
  async (trackingCode: string, { rejectWithValue }) => {
    try {
      const response = await shipmentsApi.getByTrackingCode(trackingCode);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch shipment"
      );
    }
  }
);

export const createShipment = createAsyncThunk(
  "shipment/createShipment",
  async (data: CreateShipmentDto, { rejectWithValue }) => {
    try {
      const response = await shipmentsApi.create(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create shipment"
      );
    }
  }
);

export const updateShipment = createAsyncThunk(
  "shipment/updateShipment",
  async (
    { id, data }: { id: string; data: UpdateShipmentDto },
    { rejectWithValue }
  ) => {
    try {
      const response = await shipmentsApi.update(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update shipment"
      );
    }
  }
);

export const assignCourier = createAsyncThunk(
  "shipment/assignCourier",
  async (
    { id, courierId }: { id: string; courierId: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await shipmentsApi.assignCourier(id, courierId);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to assign courier"
      );
    }
  }
);

export const transferShipment = createAsyncThunk(
  "shipment/transferShipment",
  async (
    { id, data }: { id: string; data: TransferShipmentDto },
    { rejectWithValue }
  ) => {
    try {
      const response = await shipmentsApi.transfer(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to transfer shipment"
      );
    }
  }
);

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setShipment: (state, action) => {
      state.shipment = action.payload;
    },
    setShipments: (state, action) => {
      state.shipments = action.payload;
    },
    setPagination: (state, action) => {
      state.pagination = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Shipments
      .addCase(fetchShipments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipments.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments = action.payload.items;
        state.pagination = {
          page: action.payload.meta.currentPage,
          limit: action.payload.meta.itemsPerPage,
          total: action.payload.meta.totalItems,
        };
        state.error = null;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Shipment by ID
      .addCase(fetchShipmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.shipment = action.payload;
        state.error = null;
      })
      .addCase(fetchShipmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Shipment by Tracking Code
      .addCase(fetchShipmentByTrackingCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShipmentByTrackingCode.fulfilled, (state, action) => {
        state.loading = false;
        state.shipment = action.payload;
        state.error = null;
      })
      .addCase(fetchShipmentByTrackingCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Shipment
      .addCase(createShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.shipments.unshift(action.payload);
        state.error = null;
      })
      .addCase(createShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Shipment
      .addCase(updateShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShipment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shipments.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.shipments[index] = action.payload;
        }
        if (state.shipment?.id === action.payload.id) {
          state.shipment = action.payload;
        }
        state.error = null;
      })
      .addCase(updateShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Assign Courier
      .addCase(assignCourier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignCourier.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shipments.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.shipments[index] = action.payload;
        }
        if (state.shipment?.id === action.payload.id) {
          state.shipment = action.payload;
        }
        state.error = null;
      })
      .addCase(assignCourier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Transfer Shipment
      .addCase(transferShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transferShipment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shipments.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) {
          state.shipments[index] = action.payload;
        }
        if (state.shipment?.id === action.payload.id) {
          state.shipment = action.payload;
        }
        state.error = null;
      })
      .addCase(transferShipment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setLoading,
  setError,
  setShipment,
  setShipments,
  setPagination,
} = shipmentSlice.actions;
export default shipmentSlice.reducer;
