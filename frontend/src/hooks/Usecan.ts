import { useMemo } from "react";
import { can } from "../rbac/can";
import type { Permission } from "../rbac/permission";
import { useRbacContext } from "../rbac/RbacProvider";

export function useCan(permission: Permission): boolean {
  const { permissions } = useRbacContext();
  return useMemo(() => can(permissions, permission), [permissions, permission]);
}
