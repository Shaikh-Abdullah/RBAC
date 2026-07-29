import { ALL_ACCESS, Permission } from "./permission";

export const ROLE_PERMISSIONS: Record<string, string[]> = {
  super_admin: [ALL_ACCESS],
  admin: [
    Permission.BookingsView,
    Permission.BookingsEdit,
    Permission.BookingsDelete,
    Permission.StaffView,
    Permission.StaffManage,
    Permission.FinanceView,
    Permission.ReportsView,
  ],

  operation_manager: [
    Permission.BookingsView,
    Permission.BookingsEdit,
    Permission.BookingsAssign,
    Permission.DispatchView,
    Permission.StaffView,
    Permission.StaffManage,
  ],

  call_center: [
    Permission.BookingsView,
    Permission.BookingsCreate,
    Permission.BookingsEdit,
  ],
  finance: [
    Permission.FinanceView,
    Permission.PayoutApprove,
    Permission.ReportsView,
  ],

  audit: [
    Permission.BookingsView,
    Permission.StaffView,
    Permission.FinanceView,
    Permission.ReportsView,
    Permission.LogsView,
  ],
};

export function permissionsForRole(role: string): string[] {
  return ROLE_PERMISSIONS[role] ?? [];
}
