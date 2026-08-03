import { useState, type FormEvent } from "react";
import { useCreateRole } from "../hooks";

const CreateRoleForm = ({ onDone }: { onDone: () => void }) => {
  const createRole = useCreateRole();
  const [name, setName] = useState("");
  const [label, setLabel] = useState("");
  const [nameManuallyEdited, setNameManuallyEdited] = useState(false);

  const effectiveName = nameManuallyEdited
    ? name
    : label.trim().toLowerCase().replace(/\s+/g, "_");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await createRole.mutateAsync({
        name: effectiveName,
        label: label.trim(),
        permissions: [],
      });
      setName("");
      setLabel("");
      setNameManuallyEdited(false);
      onDone();
    } catch (error) {}
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 flex flex-col gap-3 rounded-xl border border-slate/15 bg-white p-4 sm:flex-row sm:flex-wrap sm:items-end"
    >
      <div className="min-w-0 flex-1 sm:min-w-[160px]">
        <label className="block text-xs font-medium text-ink">
          Display label
        </label>
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="e.g. Regional Manager"
          required
          className="mt-1 w-full rounded-lg border border-slate/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
        />
      </div>

      <div className="min-w-0 flex-1 sm:min-w-[160px]">
        <label className="block text-xs font-medium text-ink">
          Internal name <span className="text-slate">(auto from label)</span>
        </label>
        <input
          value={effectiveName}
          onChange={(e) => {
            setName(e.target.value);
            setNameManuallyEdited(true);
          }}
          placeholder="regional_manager"
          required
          className="mt-1 w-full rounded-lg border border-slate/30 bg-paper px-3 py-2 font-mono text-xs text-slate focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
        />
      </div>

      <div className="flex w-full flex-col gap-2 sm:ml-auto sm:w-auto sm:flex-row sm:flex-wrap">
        <button
          type="submit"
          disabled={createRole.isPending}
          className="w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-paper hover:opacity-90 disabled:opacity-50 sm:w-auto"
        >
          {createRole.isPending ? "Creating…" : "Create role"}
        </button>
        <button
          type="button"
          onClick={onDone}
          className="w-full rounded-lg px-4 py-2 text-sm text-slate hover:text-ink sm:w-auto"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateRoleForm;
