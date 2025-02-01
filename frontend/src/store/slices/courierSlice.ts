import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Courier {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  status: string;
  branchId: string;
}

interface CourierState {
  items: Courier[];
  loading: boolean;
  error: string | null;
}

const initialState: CourierState = {
  items: [],
  loading: false,
  error: null,
};

const courierSlice = createSlice({
  name: "courier",
  initialState,
  reducers: {
    setCouriers: (state, action: PayloadAction<Courier[]>) => {
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

export const { setCouriers, setLoading, setError } = courierSlice.actions;
export default courierSlice.reducer;
