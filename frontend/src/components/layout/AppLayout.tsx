import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../auth/useAuth";
import { CanGate } from "../../rbac/CanGate";
import { Permission } from "../../rbac/permissions";
import { PATHS } from "../../route/paths";

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-paper flex flex-col lg:flex-row">
      <aside className="w-full shrink-0 bg-ink text-paper p-4 sm:p-6 flex flex-col justify-between lg:w-56">
        <div>
          <div className="font-display text-lg font-semibold">Aura Life</div>
          <nav className="mt-8 flex flex-col gap-1">
            <NavLink
              to={PATHS.DASHBOARD.link}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm ${isActive ? "bg-teal text-paper" : "text-slate hover:text-paper"}`
              }
              end
            >
              Dashboard
            </NavLink>
            <CanGate perm={Permission.RolesManage}>
              <NavLink
                to={PATHS.ROLES.link}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm ${isActive ? "bg-teal text-paper" : "text-slate hover:text-paper"}`
                }
              >
                Roles & Permissions
              </NavLink>
            </CanGate>
          </nav>
        </div>

        <div>
          <p className="text-xs text-slate">{user?.name}</p>
          <p className="font-mono text-[11px] text-slate/70">{user?.role}</p>
          <button
            onClick={logout}
            className="mt-3 w-full rounded-lg bg-ink-light px-3 py-2 text-xs font-medium hover:opacity-90"
          >
            Log out
          </button>
        </div>
      </aside>

      <main className="min-w-0 flex-1 overflow-x-auto p-4 sm:p-6 lg:p-10">
        <Outlet />
      </main>
    </div>
  );
}
