import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ShipmentState,
  initialState,
  CreateShipmentDto,
  UpdateShipmentDto,
  TransferShipmentDto,
} from "./types";
import { shipmentsApi } from "../../services/api";
import { PaymentType, ShipmentStatus } from "../../types/shipment";

interface Shipment {
  id: string;
  trackingCode: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  status: ShipmentStatus;
  paymentType: PaymentType;
  amount: number;
  dimensions?: {
    weight: number;
    width: number;
    height: number;
    length: number;
  };
  currentBranch?: {
    id: string;
    name: string;
  };
  assignedCourier?: {
    id: string;
    fullName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const fetchShipments = createAsyncThunk(
  "shipment/fetchShipments",
  async (params?: any) => {
    const response = await shipmentsApi.getAll(params);
    return response.data;
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
  async (
    shipmentData: Omit<
      Shipment,
      "id" | "trackingCode" | "status" | "createdAt" | "updatedAt"
    >
  ) => {
    const response = await shipmentsApi.create(shipmentData);
    return response.data;
  }
);

export const updateShipment = createAsyncThunk(
  "shipment/updateShipment",
  async ({ id, data }: { id: string; data: Partial<Shipment> }) => {
    const response = await shipmentsApi.update(id, data);
    return response.data;
  }
);

export const assignCourier = createAsyncThunk(
  "shipment/assignCourier",
  async ({
    shipmentId,
    courierId,
  }: {
    shipmentId: string;
    courierId: string;
  }) => {
    const response = await shipmentsApi.assignCourier(shipmentId, courierId);
    return response.data;
  }
);

export const transferShipment = createAsyncThunk(
  "shipment/transferShipment",
  async ({
    id,
    data,
  }: {
    id: string;
    data: { targetBranchId: string; transferNote?: string };
  }) => {
    const response = await shipmentsApi.transfer(id, data);
    return response.data;
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
        state.shipments = action.payload;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kargolar yüklenirken bir hata oluştu";
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
        state.shipments.push(action.payload);
      })
      .addCase(createShipment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kargo oluşturulurken bir hata oluştu";
      })
      // Update Shipment
      .addCase(updateShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateShipment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shipments.findIndex(
          (shipment) => shipment.id === action.payload.id
        );
        if (index !== -1) {
          state.shipments[index] = action.payload;
        }
        if (state.shipment?.id === action.payload.id) {
          state.shipment = action.payload;
        }
      })
      .addCase(updateShipment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kargo güncellenirken bir hata oluştu";
      })
      // Assign Courier
      .addCase(assignCourier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(assignCourier.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shipments.findIndex(
          (shipment) => shipment.id === action.payload.id
        );
        if (index !== -1) {
          state.shipments[index] = action.payload;
        }
        if (state.shipment?.id === action.payload.id) {
          state.shipment = action.payload;
        }
      })
      .addCase(assignCourier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Kurye atanırken bir hata oluştu";
      })
      // Transfer Shipment
      .addCase(transferShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transferShipment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.shipments.findIndex(
          (shipment) => shipment.id === action.payload.id
        );
        if (index !== -1) {
          state.shipments[index] = action.payload;
        }
        if (state.shipment?.id === action.payload.id) {
          state.shipment = action.payload;
        }
      })
      .addCase(transferShipment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kargo transferi sırasında bir hata oluştu";
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
