import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from "class-validator";


export enum AdvertiseType {
  Home = 'home', // 首页
}

export class AdvertiseInfo {
  @ApiProperty({
    description: '标题',
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '广告标题不能为空' })
  readonly title: string;

  @ApiProperty({
    description: '图片',
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '广告图片不能为空' })
  readonly picture: string;

}


export class FindAdvertiseDto {
  @ApiProperty({
    description: '广告位置 home-首页',
    required: false,
    example: 'home'
  })
  readonly type: AdvertiseType;
}


export class AdvertiseList {
  @ApiProperty({
    description: '总数',
    type: [AdvertiseInfo]
  })
  data: AdvertiseInfo[]
}