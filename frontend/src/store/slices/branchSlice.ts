import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
}

interface BranchState {
  items: Branch[];
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  items: [],
  loading: false,
  error: null,
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setBranches: (state, action: PayloadAction<Branch[]>) => {
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

export const { setBranches, setLoading, setError } = branchSlice.actions;
export default branchSlice.reducer;
