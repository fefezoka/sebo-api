import { ApiProperty } from '@nestjs/swagger';
import { IsMongoIdObject } from '../../../validator/IsMongoIdObject';

export class TransactionsByUserDto {
  @ApiProperty()
  @IsMongoIdObject()
  userId: string;
}
