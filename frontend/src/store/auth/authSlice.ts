import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthState, initialState, LoginCredentials } from "./types";
import { authApi, LoginResponse } from "../../services/api";
import Cookies from "js-cookie";

export const login = createAsyncThunk<LoginResponse, LoginCredentials>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.login(credentials);
      console.log("Login response:", response.data);
      // Store token in an HttpOnly cookie
      Cookies.set("token", response.data.token, {
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      console.log("Token saved in cookie:", Cookies.get("token"));
      return response.data;
    } catch (error: any) {
      console.log("Login error:", error.response?.data);
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getCurrentUser();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get user"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authApi.logout();
      Cookies.remove("token");
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await authApi.getUsers({ page, limit });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = {
          ...action.payload.user,
          isActive: true,
        };
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = null;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLoading, setError, setUser, setUsers } = authSlice.actions;
export default authSlice.reducer;
