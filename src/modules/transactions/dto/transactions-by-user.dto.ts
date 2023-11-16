import { ApiProperty } from '@nestjs/swagger';
import { IsMongoIdObject } from 'src/validator/IsMongoIdObject';

export class TransactionsByUserDto {
  @ApiProperty()
  @IsMongoIdObject()
  userId: string;
}
