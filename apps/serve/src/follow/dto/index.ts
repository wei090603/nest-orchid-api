import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';

enum TypeEnum {
  DynamicMe = 1,
  DynamicHe = 2,
}

export class FollowDto {
  @ApiProperty({
    description: '用户id',
    example: TypeEnum.DynamicMe,
    required: true,
    enum: TypeEnum,
  })
  @IsNumber({}, { message: '用户id不是有效的数据' })
  readonly followId: number;

  @ApiProperty({
    description: '关注类型 1-我关注 2-关注我',
    example: 1,
    required: true,
  })
  @IsNumber({}, { message: '关注类型不是有效数据' })
  readonly type: number;
}
