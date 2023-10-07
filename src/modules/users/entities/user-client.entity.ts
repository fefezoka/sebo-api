import { ApiProperty } from '@nestjs/swagger';

export class UserClient {
  @ApiProperty()
  id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  bio: string;
}
