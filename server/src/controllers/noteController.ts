import { RequestHandler } from "express";
import Note from "../models/Note";
import { handleErrorResponse } from "./errorHandlers";
import { INote } from "../models/Note";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  INote,
  unknown
> = async (req, res) => {
  const { title, text, user } = req.body;
  const { id: userId } = user;
  try {
    const newNote = await Note.create({
      title,
      text,
      user: userId,
    });

    const response: ApiResponse<INote> = {
      success: true,
      data: newNote.toObject(),
    };

    res.status(201).json(response);
  } catch (error) {
    handleErrorResponse(res, error as Error);
  }
};

export const getNotes: RequestHandler = async (req, res) => {
  const { user } = req.body;
  const { id: userId } = user;
  try {
    const notes = await Note.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("user", "username");
    if (notes.length === 0) {
      return res.status(404).json({ success: false, error: "No notes found" });
    }

    const response: ApiResponse<INote[]> = {
      success: true,
      data: notes.map((note) => note.toObject()),
    };
    res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error as Error);
  }
};

export const getNote: RequestHandler<
  { noteId: string },
  unknown,
  INote,
  unknown
> = async (req, res) => {
  const { noteId } = req.params as { noteId: string };
  const { user } = req.body;
  const { id: userId } = user;
  try {
    const note = await Note.findOne({ _id: noteId, user: userId }).populate(
      "user",
      "username"
    );
    if (!note) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    const response: ApiResponse<INote> = {
      success: true,
      data: note.toObject(),
    };
    res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error as Error);
  }
};

export const updateNote: RequestHandler<
  { noteId: string },
  unknown,
  INote,
  unknown
> = async (req, res) => {
  const { noteId } = req.params as { noteId: string };
  const { title, text } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      noteId,
      {
        title,
        text,
      },
      {
        new: true,
      }
    );
    if (!updatedNote) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    const response: ApiResponse<INote> = {
      success: true,
      data: updatedNote.toObject(),
    };

    res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error as Error);
  }
};

export const removeNote: RequestHandler = async (req, res) => {
  const { noteId } = req.params as { noteId: string };

  try {
    const deletedNote = await Note.findByIdAndDelete(noteId);
    if (!deletedNote) {
      return res.status(404).json({ success: false, error: "Note not found" });
    }

    const response: ApiResponse<INote> = {
      success: true,
    };

    res.status(200).json(response);
  } catch (error) {
    handleErrorResponse(res, error as Error);
  }
};
