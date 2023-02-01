import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export enum AdvertiseType {
  Home = 'home', // 首页
}

export class AdvertiseInfo {
  @ApiProperty({
    description: '标题',
  })
  @IsString({ message: '广告标题数据格式不正确' })
  @IsNotEmpty({ message: '广告标题数据格式不正确' })
  readonly title: string;

  @ApiProperty({
    description: '图片',
  })
  @IsString({ message: '广告图片格式不正确' })
  @IsNotEmpty({ message: '广告图片不能为空' })
  readonly picture: string;
}

export class FindAdvertiseDto {
  @ApiProperty({
    description: '广告位置 home-首页',
    required: false,
    example: AdvertiseType.Home,
  })
  @IsString({ message: '广告位置数据格式不正确' })
  @IsOptional()
  readonly position: AdvertiseType;
}

export class AdvertiseList {
  @ApiProperty({
    description: '总数',
    type: [AdvertiseInfo],
  })
  readonly data: AdvertiseInfo[];
}
