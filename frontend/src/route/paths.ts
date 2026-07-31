import { Permission } from "../rbac/permissions";

export const PATHS = {
  DASHBOARD: {
    link: "/",
    permission: null,
  },
  ROLES: {
    link: "/roles",
    permission: Permission.RolesManage,
  },
} as const;
