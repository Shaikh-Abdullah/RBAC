import { useAuth } from "../auth/useAuth";
import { useRbacContext } from "../rbac/RbacProvider";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { permissions } = useRbacContext();

  return (
    <div className="min-h-screen bg-paper p-12">
      <h1 className="font-display text-2xl font-medium text-ink">
        Welcome, {user?.name}
      </h1>
      <p className="mt-2 text-sm text-slate">
        Role: <span className="font-mono">{user?.role}</span>
      </p>
      <p className="mt-2 text-sm text-slate">
        Permissions: <span className="font-mono">{permissions.join(", ")}</span>
      </p>
      <button
        onClick={logout}
        className="mt-6 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-light"
      >
        Log out
      </button>
    </div>
  );
}
