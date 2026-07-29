import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPortalUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId;
}

const PortalUserSchema = new Schema<IPortalUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IPortalUser>(
  "PortalUser",
  PortalUserSchema,
  "portal_users",
);
