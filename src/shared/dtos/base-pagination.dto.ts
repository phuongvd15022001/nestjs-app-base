import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  EnumField,
  NumberField,
  StringField,
} from '../decorators/dto.decorator';

export class BasePaginationDto {
  @ApiPropertyOptional({ example: 10, description: 'Limit' })
  @Type(() => Number)
  @NumberField({ optional: true })
  limit?: number;

  @ApiPropertyOptional({ example: 1, description: 'Page' })
  @Type(() => Number)
  @NumberField({ optional: true })
  page?: number;

  @ApiPropertyOptional({ example: 'name', description: 'SortBy' })
  @StringField({ optional: true })
  sortBy?: string;

  @ApiPropertyOptional({ example: 'asc', description: 'Sort Direction' })
  @EnumField(Prisma.SortOrder, { optional: true })
  direction?: Prisma.SortOrder;

  @ApiPropertyOptional({ example: 'Jon', description: 'Search' })
  @StringField({ optional: true })
  search?: string;
}
