import { type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../auth/AuthContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: "14px",
          },
        }}
      />
    </AuthProvider>
  );
}
