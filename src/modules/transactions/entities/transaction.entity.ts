import { ApiProperty } from '@nestjs/swagger';
import { Transaction } from '@prisma/client';
import { ItemEntity } from '../../items/entities/item.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { IsMongoIdObject } from '../../../validator/IsMongoIdObject';

export class TransactionEntity implements Transaction {
  @ApiProperty()
  @IsMongoIdObject()
  id: string;

  @ApiProperty()
  buyerId: string;

  @ApiProperty()
  buyer: UserEntity;

  @ApiProperty()
  sellerId: string;

  @ApiProperty()
  seller: UserEntity;

  @ApiProperty()
  itemId: string;

  @ApiProperty()
  item: ItemEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  price: number;
}
