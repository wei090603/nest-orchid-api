import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

export class LikeDto {
  @ApiProperty({
    description: '文章id',
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: '数据类型不正确' })
  @IsNotEmpty({ message: '帖子ID不能为空' })
  readonly articleId: number;
}
