import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  BranchState,
  initialState,
  CreateBranchDto,
  UpdateBranchDto,
} from "./types";
import { branchesApi } from "../../services/api";

export const fetchBranches = createAsyncThunk(
  "branch/fetchBranches",
  async (params: any = {}, { rejectWithValue }) => {
    try {
      const response = await branchesApi.getAll(params);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch branches"
      );
    }
  }
);

export const fetchBranchById = createAsyncThunk(
  "branch/fetchBranchById",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await branchesApi.getById(id);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch branch"
      );
    }
  }
);

export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async (data: CreateBranchDto, { rejectWithValue }) => {
    try {
      const response = await branchesApi.create(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create branch"
      );
    }
  }
);

export const updateBranch = createAsyncThunk(
  "branch/updateBranch",
  async (
    { id, data }: { id: string; data: UpdateBranchDto },
    { rejectWithValue }
  ) => {
    try {
      const response = await branchesApi.update(id, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update branch"
      );
    }
  }
);

export const deleteBranch = createAsyncThunk(
  "branch/deleteBranch",
  async (id: string, { rejectWithValue }) => {
    try {
      await branchesApi.delete(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete branch"
      );
    }
  }
);

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
    setBranches: (state, action) => {
      state.branches = action.payload;
    },
  },
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
        state.error = action.payload as string;
      })
      // Fetch Branch by ID
      .addCase(fetchBranchById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBranchById.fulfilled, (state, action) => {
        state.loading = false;
        state.branch = action.payload;
        state.error = null;
      })
      .addCase(fetchBranchById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
        state.error = action.payload as string;
      })
      // Update Branch
      .addCase(updateBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBranch.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.branches.findIndex(
          (b) => b.id === action.payload.id
        );
        if (index !== -1) {
          state.branches[index] = action.payload;
        }
        if (state.branch?.id === action.payload.id) {
          state.branch = action.payload;
        }
        state.error = null;
      })
      .addCase(updateBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Branch
      .addCase(deleteBranch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBranch.fulfilled, (state, action) => {
        state.loading = false;
        state.branches = state.branches.filter((b) => b.id !== action.payload);
        if (state.branch?.id === action.payload) {
          state.branch = null;
        }
        state.error = null;
      })
      .addCase(deleteBranch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading, setError, setBranch, setBranches } =
  branchSlice.actions;
export default branchSlice.reducer;
