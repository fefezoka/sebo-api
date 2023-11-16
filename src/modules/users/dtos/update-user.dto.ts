import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { $Enums } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiPropertyOptional({
    enum: $Enums.Role,
    example: `${$Enums.Role.BUYER} ou ${$Enums.Role.SELLER}`,
  })
  role?: $Enums.Role;
}
