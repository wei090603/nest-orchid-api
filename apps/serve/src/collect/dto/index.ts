import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class CollectDto {
  @ApiProperty({
    description: '文章id',
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: '帖子标题不是有效的数据' })
  readonly articleId: number;
}
