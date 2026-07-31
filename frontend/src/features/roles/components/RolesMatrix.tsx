import { useEffect, useState } from "react";
import { useRoles, useUpdateRole } from "../hooks";
import { Permission } from "../../../rbac/permissions";
import { useCan } from "../../../rbac/useCan";

const ALL_PERMISSIONS = Object.values(Permission);

export function RolesMatrix() {
  const { data: roles, isLoading, error } = useRoles();
  const updateRole = useUpdateRole();
  const canEdit = useCan(Permission.RolesManage);

  const [drafts, setDrafts] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (!roles) return;
    setDrafts((prev) => {
      const next = { ...prev };
      for (const role of roles) {
        if (!next[role.name]) next[role.name] = role.permissions;
      }
      return next;
    });
  }, [roles]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-slate">
        <span className="h-3 w-3 animate-pulse rounded-full bg-teal" />
        Loading roles…
      </div>
    );
  }
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        Failed to load roles.
      </div>
    );
  }
  if (!roles) return null;

  function toggle(roleName: string, permission: string, next: boolean) {
    setDrafts((prev) => {
      const current = prev[roleName] ?? [];
      return {
        ...prev,
        [roleName]: next
          ? [...current, permission]
          : current.filter((p) => p !== permission),
      };
    });
  }

  function isDirty(roleName: string, original: string[]) {
    const draft = drafts[roleName] ?? [];
    return (
      draft.length !== original.length ||
      !draft.every((p) => original.includes(p))
    );
  }

  const dirtyRoles = roles.filter((r) => isDirty(r.name, r.permissions));

  async function handleSaveAll() {
    await Promise.all(
      dirtyRoles.map((role) =>
        updateRole.mutateAsync({
          name: role.name,
          permissions: drafts[role.name] ?? [],
        }),
      ),
    );
  }

  return (
    <div>
      <div className="overflow-hidden rounded-2xl border border-slate/15 shadow-sm">
        <div className="max-h-[600px] overflow-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead className="sticky top-0 z-20">
              <tr>
                <th className="sticky left-0 z-30 min-w-[220px] border-b border-slate/15 bg-ink px-5 py-3.5 text-left font-mono text-[11px] font-medium uppercase tracking-wider text-brass-light">
                  Permission
                </th>
                {roles.map((role) => (
                  <th
                    key={role._id}
                    className="min-w-[130px] border-b border-l border-slate/10 bg-ink px-4 py-3.5 text-center font-display text-sm font-medium text-paper"
                  >
                    <div className="flex flex-col items-center gap-0.5">
                      <span>{role.label}</span>
                      {role.permissions.includes("*") && (
                        <span className="rounded-full bg-brass/20 px-2 py-0.5 text-[10px] font-normal text-brass-light">
                          full access
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_PERMISSIONS.map((permission, i) => (
                <tr
                  key={permission}
                  className={`group ${i % 2 === 0 ? "bg-white" : "bg-paper/60"}`}
                >
                  <td
                    className={`sticky left-0 z-10 border-b border-slate/10 px-5 py-2.5 font-mono text-xs text-ink group-hover:bg-teal/5 ${
                      i % 2 === 0 ? "bg-white" : "bg-paper/60"
                    }`}
                  >
                    {permission}
                  </td>
                  {roles.map((role) => {
                    const draft = drafts[role.name] ?? [];
                    const isWildcard = draft.includes("*");
                    const checked = isWildcard || draft.includes(permission);

                    return (
                      <td
                        key={role._id}
                        className="border-b border-l border-slate/10 px-4 py-2.5 text-center group-hover:bg-teal/5"
                      >
                        <label className="inline-flex cursor-pointer items-center justify-center">
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={!canEdit || isWildcard}
                            onChange={() =>
                              toggle(role.name, permission, !checked)
                            }
                            className="peer sr-only"
                          />
                          <span
                            className={`flex h-4.5 w-4.5 items-center justify-center rounded-[5px] border transition-colors
                              ${checked ? "border-teal bg-teal" : "border-slate/40 bg-white"}
                              ${!canEdit || isWildcard ? "opacity-40" : "peer-hover:border-teal"}`}
                          >
                            {checked && (
                              <svg
                                viewBox="0 0 12 10"
                                className="h-2.5 w-2.5 fill-none stroke-paper stroke-[2]"
                              >
                                <path
                                  d="M1 5l3 3 7-7"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            )}
                          </span>
                        </label>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {canEdit && (
        <div
          className={`mt-4 flex items-center justify-between rounded-xl border px-4 py-3 transition-all ${
            dirtyRoles.length > 0
              ? "border-brass/30 bg-brass/10 opacity-100"
              : "pointer-events-none border-transparent opacity-0"
          }`}
        >
          <span className="text-xs text-ink">
            <span className="font-medium">{dirtyRoles.length}</span> role
            {dirtyRoles.length === 1 ? "" : "s"} with unsaved changes
            {dirtyRoles.length > 0 && (
              <span className="text-slate">
                {" "}
                — {dirtyRoles.map((r) => r.label).join(", ")}
              </span>
            )}
          </span>
          <button
            onClick={handleSaveAll}
            disabled={updateRole.isPending || dirtyRoles.length === 0}
            className="rounded-lg bg-ink px-4 py-1.5 text-xs font-medium text-paper transition-colors hover:bg-ink-light disabled:opacity-50"
          >
            {updateRole.isPending ? "Saving…" : "Save changes"}
          </button>
        </div>
      )}
    </div>
  );
}
