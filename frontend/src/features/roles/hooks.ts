import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getRoles, getRole, updateRole, createRole, deleteRole } from "./api";

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

export function useCreateRole() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createRole,
    onSuccess: (newRole) => {
      queryClient.invalidateQueries({ queryKey: ROLES_KEY });
      toast.success(`${newRole.label} Created`);
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message ?? "Failed to create role";
      toast.error(message);
    },
  });
}

export function useDeleteRole() {
  const quertClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRole,
    onSuccess: (_data, roleName) => {
      quertClient.invalidateQueries({ queryKey: ROLES_KEY });
      toast.success(`Role "${roleName} deleted`);
    },
    onError: (err: any) => {
      const message = err?.response?.data?.message ?? "Failed to delete role";
      toast.error(message);
    },
  });
}
