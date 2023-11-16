import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional({
    enum: $Enums.CategoryStatus,
    example: `${$Enums.CategoryStatus.ACTIVE} ou ${$Enums.CategoryStatus.NOTACTIVE}`,
  })
  status: $Enums.CategoryStatus;
}
