import { ALL_ACCESS, type Permission } from "./permissions";
export function can(
  grants: string[] | undefined | null,
  required: Permission,
): boolean {
  if (!grants || grants.length === 0) return false;
  return grants.includes(ALL_ACCESS) || grants.includes(required);
}
