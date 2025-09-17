import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/common/types/enums";

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles)
