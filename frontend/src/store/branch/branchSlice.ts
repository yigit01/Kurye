import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Branch {
  id: number;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
}

interface BranchState {
  items: Branch[];
  loading: boolean;
}

const initialState: BranchState = {
  items: [],
  loading: false,
};

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Branch[]>) {
      state.items = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const { setItems, setLoading } = branchSlice.actions;
export default branchSlice.reducer;
