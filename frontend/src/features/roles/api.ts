import { apiClient } from "../../lib/api/client";

export interface Role {
  _id: string;
  name: string;
  label: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

export async function getRoles(): Promise<Role[]> {
  const { data } = await apiClient.get<Role[]>("/roles");
  return data;
}

export async function getRole(name: string): Promise<Role> {
  const { data } = await apiClient.get<Role>(`/roles/${name}`);
  return data;
}

export async function updateRole(
  name: string,
  permissions: string[],
): Promise<Role> {
  const { data } = await apiClient.put<Role>(`/roles/${name}`, { permissions });
  return data;
}
