import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/authThunk";
import { logoutThunk } from "../thunks/authThunk";

export type User = {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
};

const getStoredUser = (): User | null => {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  }
  return null;
};

const initialState: AuthState = {
  isAuthenticated: !!getStoredUser(),
  user: getStoredUser(),
  status: "idle",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginThunk.fulfilled, (state) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutThunk.rejected, (state) => {
        state.isAuthenticated = true;
      });
  },
});

export default authSlice.reducer;
