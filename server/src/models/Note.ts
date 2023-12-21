import { Schema, Types, model } from "mongoose";

export interface INote {
  title: string;
  text?: string;
  user: Types.ObjectId;
}

const noteSchema = new Schema<INote>(
  {
    title: { type: String, required: true },
    text: { type: String, required: false },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Note = model<INote>("Note", noteSchema);
export default Note;
