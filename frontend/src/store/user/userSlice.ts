import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  identificationNumber: string | null;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  totalItems: number;
}

interface ApiResponse {
  data: User[];
  meta: {
    itemsPerPage: number;
    totalItems: number;
    currentPage: string;
    totalPages: number;
    sortBy: [string, string][];
  };
  links: {
    current: string;
  };
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
  totalItems: 0,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ page, limit }: { page: number; limit: number }) => {
    const response = await api.get(
      `/users?page=${page}&limit=${limit}&sortBy=createdAt:DESC`
    );
    return response.data as ApiResponse;
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
    role: string;
  }) => {
    const response = await api.post("/users", userData);
    return response.data;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data;
        state.totalPages = action.payload.meta.totalPages;
        state.currentPage = parseInt(action.payload.meta.currentPage);
        state.totalItems = action.payload.meta.totalItems;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kullanıcılar yüklenirken bir hata oluştu";
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.unshift(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Kullanıcı oluşturulurken bir hata oluştu";
      });
  },
});

export default userSlice.reducer;
