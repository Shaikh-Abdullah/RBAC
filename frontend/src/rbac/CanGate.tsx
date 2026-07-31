import type { ReactNode } from "react";
import type { Permission } from "./permissions";
import { useCan } from "./useCan";

interface CanProps {
  perm: Permission;
  fallback?: ReactNode;
  children: ReactNode;
}

export function CanGate({ perm, fallback = null, children }: CanProps) {
  const allowed = useCan(perm);
  return <>{allowed ? children : fallback}</>;
}
