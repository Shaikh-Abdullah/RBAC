import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import PortalUser from "../models/PortalUser";
import PortalBlacklistedToken from "../models/PortalBlacklistedToken";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
    permissions: string[];
  };
}

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Missing or invalid Authorization header" });
    }
    const token = authHeader.split(" ")[1];
    const isBlacklisted = await PortalBlacklistedToken.findOne({ token });
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token has been logged out" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
      role: string;
    };
    const user = await PortalUser.findById(decoded.id).populate("role");
    if (!user) {
      return res.status(401).json({ message: "User no longer exist" });
    }

    const roleDoc = user.role as any;
    req.user = {
      id: user._id.toString(),
      role: roleDoc.name,
      permissions: roleDoc.permissions,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
