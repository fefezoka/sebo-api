import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({
    enum: $Enums.Role,
    example: `${$Enums.Role.ADMIN}, ${$Enums.Role.BUYER} ou ${$Enums.Role.SELLER}`,
  })
  role: $Enums.Role;

  @ApiProperty({
    enum: $Enums.UserStatus,
    example: `${$Enums.UserStatus.ACTIVE} ou ${$Enums.UserStatus.NOTACTIVE}`,
  })
  status: $Enums.UserStatus;

  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
