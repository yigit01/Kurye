import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { branchesApi } from "../../services/api";
import { Branch, BranchState } from "./types";

const initialState: BranchState = {
  branch: null,
  branches: null,
  loading: false,
  error: null,
};

export const fetchBranches = createAsyncThunk(
  "branch/fetchBranches",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await branchesApi.getAll({
      page,
      limit,
      sortBy: ["createdAt:DESC"],
    });
    return response.data;
  }
);

export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async (
    branchData: Omit<Branch, "id" | "createdAt" | "updatedAt" | "isActive">
  ) => {
    const response = await branchesApi.create(branchData);
    return response.data;
  }
);

export const updateBranch = createAsyncThunk(
  "branch/updateBranch",
  async ({ id, data }: { id: string; data: Partial<Branch> }) => {
    const response = await branchesApi.update(id, data);
    return response.data;
  }
);

export const deleteBranch = createAsyncThunk(
  "branch/deleteBranch",
  async (id: string) => {
    await branchesApi.delete(id);
    return id;
  }
);

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch branches
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = action.payload;
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Şubeler yüklenirken bir hata oluştu";
      })
      // Create branch
      .addCase(createBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBranch.fulfilled, (state, action) => {
        state.loading = false;
        if (state.branches) {
          state.branches.data.unshift(action.payload);
          state.branches.meta.totalItems += 1;
          state.branches.meta.itemCount += 1;
        }
      })
      .addCase(createBranch.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Şube oluşturulurken bir hata oluştu";
      })
      // Update branch
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;
        if (state.branches) {
          const index = state.branches.data.findIndex(
            (branch) => branch.id === action.payload.id
          );
          if (index !== -1) {
            state.branches.data[index] = action.payload;
          }
        }
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Şube güncellenirken bir hata oluştu";
      })
      // Delete branch
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;
        if (state.branches) {
          state.branches.data = state.branches.data.filter(
            (branch) => branch.id !== action.payload
          );
          state.branches.meta.totalItems -= 1;
          state.branches.meta.itemCount -= 1;
        }
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Şube silinirken bir hata oluştu";
      });
  },
});

export default branchSlice.reducer;
