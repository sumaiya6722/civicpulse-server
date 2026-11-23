import "../access/index.mjs";
import { OrganizationOptions } from "./types.mjs";
export type PermissionExclusive = {
  permissions: {
    [key: string]: string[];
  };
};
export type HasPermissionBaseInput = {
  role: string;
  options: OrganizationOptions;
  allowCreatorAllPermissions?: boolean | undefined;
} & PermissionExclusive;