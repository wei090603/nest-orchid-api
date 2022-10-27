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
}
