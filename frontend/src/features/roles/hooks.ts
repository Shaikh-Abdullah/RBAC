import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getRoles, getRole, updateRole } from "./api";

const ROLES_KEY = ["roles"] as const;

export function useRoles() {
  return useQuery({
    queryKey: ROLES_KEY,
    queryFn: getRoles,
  });
}

export function useRole(name: string) {
  return useQuery({
    queryKey: [...ROLES_KEY, name],
    queryFn: () => getRole(name),
    enabled: !!name,
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      name,
      permissions,
    }: {
      name: string;
      permissions: string[];
    }) => updateRole(name, permissions),
    onSuccess: (updatedRole) => {
      queryClient.invalidateQueries({ queryKey: ROLES_KEY });
      toast.success(`${updatedRole.label} updated`);
    },
    onError: () => {
      toast.error("Failed to update role");
    },
  });
}
