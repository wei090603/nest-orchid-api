import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsNumber,
} from 'class-validator';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';

export enum AdvertiseType {
  Home = 'home', // 首页
}

export class AdvertiseInfo {
  @ApiProperty({
    description: '标题',
  })
  @IsString({ message: '广告标题不是有效的数据' })
  @IsNotEmpty({ message: '广告标题不能为空' })
  readonly title: string;

  @ApiProperty({
    description: '类型',
  })
  @IsString({ message: '广告图片不是有效的数据' })
  @IsNotEmpty({ message: '广告图片不能为空' })
  readonly picture: string;

  @ApiProperty({
    description: '广告位置',
    example: AdvertiseType.Home,
  })
  @IsString({ message: '广告位置不是有效的数据' })
  @IsNotEmpty({ message: '广告位置不能为空' })
  readonly position: AdvertiseType;

  @ApiProperty({
    description: '描述',
  })
  @IsString({ message: '描述不是有效的数据' })
  readonly describe: string;

  @ApiProperty({
    description: '链接',
  })
  @IsString({ message: '链接不是有效的数据' })
  readonly link: string;

  @ApiProperty({
    description: '状态 false-隐藏 true-显示',
    example: true,
  })
  @IsOptional()
  @IsBoolean({ message: '状态不是有效的数据' })
  readonly status: boolean;

  @ApiProperty({
    description: '排序',
    required: false,
    example: 255,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 255 }, { message: '排序不是有效的数据' })
  readonly sort: number;
}

export class FindAdvertiseDto extends PageOptionsDto {
  @ApiProperty({
    description: '标题',
    required: false,
  })
  @IsOptional()
  readonly title: string;

  @ApiProperty({
    description: '广告位置 home-首页',
    required: false,
    example: '',
  })
  @IsOptional()
  readonly position: AdvertiseType;
}

export class PageAdvertiseList {
  @ApiProperty({
    description: '总数',
    type: [AdvertiseInfo],
  })
  list: AdvertiseInfo[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
