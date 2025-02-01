import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Shipment {
  id: number;
  trackingCode: string;
  recipientName: string;
  status: string;
  createdAt: string;
}

interface ShipmentState {
  items: Shipment[];
  loading: boolean;
}

const initialState: ShipmentState = {
  items: [],
  loading: false,
};

const shipmentSlice = createSlice({
  name: "shipment",
  initialState,
  reducers: {
    setShipments(state, action: PayloadAction<Shipment[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setShipments, setLoading } = shipmentSlice.actions;
export default shipmentSlice.reducer;
