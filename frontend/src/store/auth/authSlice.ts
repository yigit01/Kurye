import { createSlice } from "@reduxjs/toolkit";
import { AuthState, initialState } from "./types";

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
});

export const { setLoading, setError, setUser, setUsers } = authSlice.actions;
export default authSlice.reducer;
