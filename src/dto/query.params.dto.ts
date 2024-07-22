import { IsOptional, IsString, IsNumber, IsEnum } from 'class-validator';
import { Transform } from 'class-transformer';

enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export class QueryParamsDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  limit?: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsNumber()
  offset?: number;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @IsEnum(SortOrder)
  sortOrder?: SortOrder;
}
