export const Permission = {
  BookingsView: "bookings:view",
  BookingsCreate: "bookings:create",
  BookingsEdit: "bookings:edit",
  BookingsDelete: "bookings:delete",
  BookingsAssign: "bookings:assign",

  DispatchView: "dispatch:view",

  StaffView: "staff:view",
  StaffManage: "staff:manage",

  FinanceView: "finance:view",
  PayoutApprove: "payout:approve",

  ReportsView: "reports:view",
  LogsView: "logs:view",

  RolesManage: "roles:manage",
} as const;

export type Permission = (typeof Permission)[keyof typeof Permission];

export const ALL_ACCESS = "*" as const;
