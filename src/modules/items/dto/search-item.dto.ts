import { ApiPropertyOptional } from '@nestjs/swagger';

export class SearchItemDto {
  @ApiPropertyOptional()
  title: string;

  @ApiPropertyOptional()
  isbn: string;

  @ApiPropertyOptional()
  author: string;
}
