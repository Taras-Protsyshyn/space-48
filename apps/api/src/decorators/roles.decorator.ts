import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '@space-48/shared/constants';

export const ROLES_KEY = 'roles'
export const Roles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
