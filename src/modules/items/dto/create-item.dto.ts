import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';

export class CreateItemDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  edition: Date;

  @ApiProperty({ example: 'livro ou revista' })
  category: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty({
    enum: $Enums.ItemStatus,
    example: `${$Enums.ItemStatus.ACTIVE}, ${$Enums.ItemStatus.NOTACTIVE}, ${$Enums.ItemStatus.AVAILABLE} ou ${$Enums.ItemStatus.NOTAVAILABLE}`,
  })
  status: $Enums.ItemStatus;
}
