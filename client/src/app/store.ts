import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/slices/authSlice";
import NoteReducer from "../features/slices/noteSlice"

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    note: NoteReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
