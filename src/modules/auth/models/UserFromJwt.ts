import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class UserFromJwt {
  @ApiProperty()
  id: string;

  @ApiProperty()
  role: $Enums.Role;
}
