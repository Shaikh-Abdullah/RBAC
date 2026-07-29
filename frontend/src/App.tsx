import { RbacProvider } from "./rbac/RbacProvider";
import { useCan } from "./hooks/Usecan";
import { Permission } from "./rbac/permission";
import { permissionsForRole } from "./rbac/roleMap";

function Dashboard() {
  const canDelete = useCan(Permission.BookingsDelete);
  const canViewFinance = useCan(Permission.FinanceView);

  return (
    <div className="p-8 space-y-3">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <p>
        Can delete bookings: <strong>{canDelete ? "Yes" : "No"}</strong>
      </p>
      <p>
        Can view finance: <strong>{canViewFinance ? "Yes" : "No"}</strong>
      </p>
    </div>
  );
}

function App() {
  const currentRole = "audit";
  return (
    <RbacProvider permissions={permissionsForRole(currentRole)}>
      <Dashboard />
    </RbacProvider>
  );
}

export default App;
