import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';
import { IsMongoIdObject } from '../../../validator/IsMongoIdObject';

export class UserEntity implements User {
  @ApiProperty()
  @IsMongoIdObject()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  password: string;

  @ApiProperty()
  role: $Enums.Role;

  @ApiProperty()
  status: $Enums.UserStatus;
}
