import mongoose, { Schema, Document } from "mongoose";

export interface IPortalBlacklistedToken extends Document {
  token: string;
  expiredAt: Date;
}

const PortalBlacklistedTokenSchema = new Schema<IPortalBlacklistedToken>({
  token: { type: String, required: true, unique: true },
  expiredAt: { type: Date, required: true, index: { expires: 0 } },
});

export default mongoose.model<IPortalBlacklistedToken>(
  "PortalBlacklistedToken",
  PortalBlacklistedTokenSchema,
  "portal_blacklisted_tokens",
);
