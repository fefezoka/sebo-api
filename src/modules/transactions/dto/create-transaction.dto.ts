import { ApiProperty } from '@nestjs/swagger';
import { IsMongoIdObject } from '../../../validator/IsMongoIdObject';

export class CreateTransactionDto {
  @ApiProperty()
  @IsMongoIdObject()
  itemId: string;

  @ApiProperty()
  @IsMongoIdObject()
  buyerId: string;

  @ApiProperty()
  @IsMongoIdObject()
  sellerId: string;

  @ApiProperty()
  price: number;
}
