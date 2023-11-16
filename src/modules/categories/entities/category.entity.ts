import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums, Category } from '@prisma/client';
import { IsMongoIdObject } from '../../../validator/IsMongoIdObject';

export class CategoryEntity implements Category {
  @ApiProperty()
  @IsMongoIdObject()
  id: string;

  @ApiPropertyOptional()
  description: string | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  status: $Enums.CategoryStatus;
}
