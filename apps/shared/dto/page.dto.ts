import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsPositive, Min } from 'class-validator';

export class PageOptionsDto {
  @ApiProperty({
    description: '当前页包含数量',
    required: false,
    default: 10,
  })
  @IsInt()
  @Min(1)
  @IsPositive()
  @IsOptional()
  readonly limit: number;

  @ApiProperty({
    description: '当前页包含数量',
    required: false,
    default: 1,
  })
  @IsInt()
  @Min(1)
  @IsPositive()
  @IsOptional()
  readonly page: number;
}

export class PageResult<T> {
  list?: Array<T>;
  total: number;
}
