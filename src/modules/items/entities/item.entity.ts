import { ApiProperty } from '@nestjs/swagger';
import { $Enums, Item } from '@prisma/client';
import { CategoryEntity } from 'src/modules/categories/entities/category.entity';
import { IsMongoIdObject } from 'src/validator/IsMongoIdObject';

export class ItemEntity implements Item {
  @ApiProperty()
  @IsMongoIdObject()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  edition: Date;

  @ApiProperty()
  price: number;

  @ApiProperty()
  status: $Enums.ItemStatus;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  categoryId: string;

  @ApiProperty()
  category: CategoryEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  isbn: string;
}
