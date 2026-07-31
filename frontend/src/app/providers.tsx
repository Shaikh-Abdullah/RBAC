import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../auth/AuthContext";
import { RbacProvider } from "../rbac/RbacProvider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <RbacProvider>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              fontSize: "14px",
            },
          }}
        />
      </RbacProvider>
    </AuthProvider>
  );
}
