import mongoose, { Schema, Document } from "mongoose";

export interface IRole extends Document {
  name: string;
  label: string;
  permissions: string[];
}

const RoleScheme = new Schema<IRole>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
    },
    permissions: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default mongoose.model<IRole>("Role", RoleScheme);
