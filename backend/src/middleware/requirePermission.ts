import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./auth";

export function requirePermission(permission: string) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const permissions = req.user?.permissions ?? [];

    console.log("req.user:", req.user); // add this line temporarily

    const allowed =
      permissions.includes("*") || permissions.includes(permission);

    if (!allowed) {
      return res
        .status(403)
        .json({ message: `Forbidden: missing permission "${permission}"` });
    }
    next();
  };
}
