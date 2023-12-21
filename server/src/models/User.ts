import { InferSchemaType, Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

type Note = InferSchemaType<typeof userSchema>;

const User = model<Note>("User", userSchema);
export default User;
