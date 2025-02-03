import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { shipmentsApi } from "../../services/api";
import { Shipment } from "../../types/shipment";

export interface ShipmentState {
  items: Shipment[];
  loading: boolean;
  error: string | null;
}

const initialState: ShipmentState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchShipments = createAsyncThunk(
  "shipment/fetchShipments",
  async () => {
    const response = await shipmentsApi.getAll();
    return response.data;
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

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    setShipments: (state, action: PayloadAction<Shipment[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
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
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchShipments.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kargolar yüklenirken bir hata oluştu";
      })
      // Create Shipment
      .addCase(createShipment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createShipment.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.error = null;
      })
      .addCase(createShipment.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kargo oluşturulurken bir hata oluştu";
      });
  },
});

export const { setShipments, setLoading, setError } = shipmentSlice.actions;
export default shipmentSlice.reducer;
