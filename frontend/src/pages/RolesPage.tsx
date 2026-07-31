import { RolesMatrix } from "../features/roles/components/RolesMatrix";

export default function RolesPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-ink mb-6">
        Roles &amp; Permissions
      </h1>
      <RolesMatrix />
    </div>
  );
}
