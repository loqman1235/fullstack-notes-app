import { createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "../../services/noteService";
import { ICreateNote } from "../../types";
import { resetNote } from "../slices/noteSlice";

// Get Notes Thunk
export const getNotesThunk = createAsyncThunk(
  "notes/get",
  async (_, { rejectWithValue, dispatch }) => {
    dispatch(resetNote());
    try {
      const response = await noteService.getNotes();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Create Note Thunk
export const createNoteThunk = createAsyncThunk(
  "notes/create",
  async ({ title, text }: ICreateNote, { rejectWithValue }) => {
    try {
      const response = await noteService.createNote({ title, text });
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data.errors);
    }
  }
);

// Remove Note Thunk
export const deleteNoteThunk = createAsyncThunk(
  "note/delete",
  async ({ _id }: { _id: string }, { rejectWithValue }) => {
    try {
      await noteService.deleteNot({ _id });
      return _id;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response.data.error);
    }
  }
);
