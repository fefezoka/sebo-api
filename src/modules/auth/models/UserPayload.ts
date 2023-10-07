import { $Enums } from '@prisma/client';

export interface UserPayload {
  sub: string;
  role: $Enums.Role;
  iat?: number;
  exp?: number;
}
