import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";

export function ProtectedRoute() {
  const { user, isInitializing } = useAuth();
  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-paper text-slate text-sm">
        Loading…
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export function PublicOnlyRoute() {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
