import { ICreateNote } from "../types";
import api from "./api";

const noteService = {
  getNotes: async () => {
    const { status, data } = await api.get("/notes");

    if (status !== 200) {
      throw new Error("Failed fetching notes");
    }

    return data;
  },
  getNote: async () => {},

  createNote: async ({ title, text }: ICreateNote) => {
    const { status, data } = await api.post("/notes", { title, text });

    if (status !== 201) {
      throw new Error("Failed creating note");
    }

    return data;
  },
  updateNote: async () => {},
  deleteNot: async ({ _id }: { _id: string }) => {
    const { status, data } = await api.delete(`/notes/${_id}`);

    if (status !== 200) {
      throw new Error("Failed deleting note");
    }

    return data;
  },
};

export default noteService;
