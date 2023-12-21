import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createNoteThunk,
  deleteNoteThunk,
  getNotesThunk,
} from "../thunks/noteThunk";
import { INote } from "../../types";

type NoteState = {
  notes: INote[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: NoteState = {
  notes: [],
  status: "idle",
  error: null,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    resetNote: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getNotesThunk.fulfilled,
        (state, action: PayloadAction<INote[]>) => {
          state.status = "succeeded";
          state.notes = action.payload;
        }
      )
      .addCase(getNotesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Something went wrong";
      })
      .addCase(createNoteThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createNoteThunk.fulfilled,
        (state, action: PayloadAction<INote>) => {
          state.status = "succeeded";
          state.notes.unshift(action.payload);
        }
      )
      .addCase(createNoteThunk.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteNoteThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.notes = state.notes.filter((note) => note._id !== action.payload);
      })
      .addCase(deleteNoteThunk.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default noteSlice.reducer;

export const { resetNote } = noteSlice.actions;
