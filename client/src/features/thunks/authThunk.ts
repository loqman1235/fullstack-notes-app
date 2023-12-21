import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await authService.login(data);
      return response.data;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error, "error authThunk");
      if (error.response?.data?.errors) {
        return rejectWithValue(error.response.data.errors);
      }
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.error) {
        return rejectWithValue(error.response.data.error);
      }
      return rejectWithValue("An unknown error occurred during logout.");
    }
  }
);
