import { createContext, useContext, useMemo, type ReactNode } from "react";

interface RbacContextValue {
  permissions: string[];
}

const RbacContext = createContext<RbacContextValue | null>(null);

interface RbacProviderProps {
  permissions: string[];
  children: ReactNode;
}

export function RbacProvider({ permissions, children }: RbacProviderProps) {
  const value = useMemo(() => ({ permissions }), [permissions]);
  return <RbacContext.Provider value={value}>{children}</RbacContext.Provider>;
}

export function useRbacContext(): RbacContextValue {
  const ctx = useContext(RbacContext);
  if (!ctx) {
    throw new Error("useRbacContext must be used within an <RbacProvider>");
  }
  return ctx;
}
