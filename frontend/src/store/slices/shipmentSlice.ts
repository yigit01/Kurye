import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Shipment {
  id: string;
  trackingCode: string;
  status: string;
  recipientName: string;
  recipientAddress: string;
  createdAt: string;
}

interface ShipmentState {
  items: Shipment[];
  loading: boolean;
  error: string | null;
}

const initialState: ShipmentState = {
  items: [],
  loading: false,
  error: null,
};

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
});

export const { setShipments, setLoading, setError } = shipmentSlice.actions;
export default shipmentSlice.reducer;
