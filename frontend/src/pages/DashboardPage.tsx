import { useAuth } from "../auth/useAuth";
import { useCan } from "../rbac/useCan";
import { Permission } from "../rbac/permissions";
import { CanGate } from "../rbac/CanGate";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const canManageRoles = useCan(Permission.RolesManage);
  const canViewFinance = useCan(Permission.FinanceView);

  return (
    <div className="min-h-screen bg-paper p-12">
      <h1 className="font-display text-2xl font-medium text-ink">
        Welcome, {user?.name}
      </h1>
      <p className="mt-2 text-sm text-slate">
        Role: <span className="font-mono">{user?.role}</span>
      </p>
      <p className="mt-2 text-sm text-slate">
        Can manage roles: <strong>{canManageRoles ? "Yes" : "No"}</strong>
      </p>
      <p className="mt-2 text-sm text-slate">
        Can view finance: <strong>{canViewFinance ? "Yes" : "No"}</strong>
      </p>
      <CanGate
        perm={Permission.RolesManage}
        fallback={
          <p className="mt-4 text-sm text-slate">
            No access to role management.
          </p>
        }
      >
        <button className="mt-4 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-paper hover:opacity-90">
          Manage Roles
        </button>
      </CanGate>
      <button
        onClick={logout}
        className="mt-6 rounded-lg bg-ink px-4 py-2 text-sm font-medium text-paper hover:bg-ink-light"
      >
        Log out
      </button>
    </div>
  );
}
