import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { branchesApi } from "../../services/api";

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  location?: string;
  isActive: boolean;
}

interface BranchState {
  branches: Branch[];
  loading: boolean;
  error: string | null;
}

const initialState: BranchState = {
  branches: [],
  loading: false,
  error: null,
};

export const fetchBranches = createAsyncThunk(
  "branch/fetchBranches",
  async () => {
    const response = await branchesApi.getAll();
    return response.data;
  }
);

export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async (branchData: Omit<Branch, "id" | "isActive" | "location">) => {
    const response = await branchesApi.create(branchData);
    return response.data;
  }
);

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Branches
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
        state.error = null;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Şubeler yüklenirken bir hata oluştu";
      })
      // Create Branch
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches.push(action.payload);
        state.error = null;
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Şube oluşturulurken bir hata oluştu";
      });
  },
});

export default branchSlice.reducer;
