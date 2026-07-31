import { useMemo } from "react";
import { can } from "./can";
import type { Permission } from "./permissions";
import { useRbacContext } from "./RbacProvider";

export function useCan(permisson: Permission): boolean {
  const { permissions } = useRbacContext();
  return useMemo(() => can(permissions, permisson), [permissions, permisson]);
}
