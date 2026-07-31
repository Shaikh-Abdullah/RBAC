import { useAuth } from "../auth/useAuth";
import { CanGate } from "../rbac/CanGate";
import { Permission } from "../rbac/permissions";
import { Link } from "react-router-dom";
import { PATHS } from "../route/paths";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink">
        Welcome back, {user?.name?.split(" ")[0]}
      </h1>
      <p className="mt-1 text-sm text-slate">
        Signed in as <span className="font-mono text-teal">{user?.role}</span>
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate/15 bg-white p-5">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate">
            Your access
          </p>
          <p className="mt-2 font-display text-3xl font-medium text-ink">
            {user?.permissions.includes("*")
              ? "Full"
              : user?.permissions.length}
          </p>
          <p className="mt-1 text-xs text-slate">
            {user?.permissions.includes("*")
              ? "unrestricted permissions"
              : "permissions granted"}
          </p>
        </div>

        <CanGate perm={Permission.RolesManage}>
          <Link
            to={PATHS.ROLES.link}
            className="rounded-2xl border border-slate/15 bg-white p-5 transition-colors hover:border-teal/40"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-slate">
              Administration
            </p>
            <p className="mt-2 font-display text-lg font-medium text-ink">
              Roles &amp; Permissions
            </p>
            <p className="mt-1 text-xs text-teal">Manage access →</p>
          </Link>
        </CanGate>
      </div>
    </div>
  );
}
