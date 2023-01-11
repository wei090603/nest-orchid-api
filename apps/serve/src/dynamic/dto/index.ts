import { ApiProperty } from '@nestjs/swagger';

export class DynamiceDto {
  @ApiProperty({
    description: '1-发表文章 2-点赞文章 3-关注用户',
    example: 1,
    required: true,
  })
  readonly type: number;

  @ApiProperty({
    description: '用户id',
    example: 1,
    required: true,
  })
  readonly userId: number;

  @ApiProperty({
    description: '文章id',
    example: 1,
    required: false,
  })
  readonly articleId?: number;

  @ApiProperty({
    description: '关注用户id',
    example: 1,
    required: false,
  })
  readonly followId?: number;
}
