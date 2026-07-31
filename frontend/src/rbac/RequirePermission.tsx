import { Navigate, Outlet } from "react-router-dom";
import type { Permission } from "./permissions";
import { useCan } from "./useCan";

interface ReqirePermissionProps {
  permission: Permission;
  redirectTo?: string;
}

export function RequirePermission({
  permission,
  redirectTo = "/",
}: ReqirePermissionProps) {
  const allowed = useCan(permission);

  if (!allowed) {
    <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
}
