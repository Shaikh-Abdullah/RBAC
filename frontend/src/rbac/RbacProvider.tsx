import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useAuth } from "../auth/useAuth";

interface RbacContextValue {
  permissions: string[];
}

const RbacContext = createContext<RbacContextValue | null>(null);

export function RbacProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const value = useMemo(
    () => ({ permissions: user?.permissions ?? [] }),
    [user],
  );

  return <RbacContext.Provider value={value}>{children}</RbacContext.Provider>;
}

export function useRbacContext(): RbacContextValue {
  const ctx = useContext(RbacContext);
  if (!ctx) {
    throw new Error("useRbacContext must be used within an <RbacProvider>");
  }
  return ctx;
}
