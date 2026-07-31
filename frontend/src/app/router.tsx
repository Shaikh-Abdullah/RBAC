import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute, PublicOnlyRoute } from "../auth/ProtectedRoute";
import { RequirePermission } from "../rbac/RequirePermission";
import { AppLayout } from "../components/layout/AppLayout";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import RolesPage from "../pages/RolesPage";
import { PATHS } from "../route/paths";
import { Permission } from "../rbac/permissions";

export const router = createBrowserRouter([
  {
    element: <PublicOnlyRoute />,
    children: [{ path: "/login", element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { path: PATHS.DASHBOARD.link, element: <DashboardPage /> },
          {
            element: <RequirePermission permission={Permission.RolesManage} />,
            children: [{ path: PATHS.ROLES.link, element: <RolesPage /> }],
          },
        ],
      },
    ],
  },
]);
