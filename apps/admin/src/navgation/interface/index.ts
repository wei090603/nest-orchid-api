import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class NavgationInfo {
  @ApiProperty({
    description: '菜单名',
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '标签名不能为空' })
  readonly title: string;

  @ApiProperty({
    description: '地址',
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '地址不能为空' })
  readonly link: string;

  @ApiProperty({
    description: '排序',
    required: false,
    example: 255,
  })
  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 255 }, { message: '不是有效的数据' })
  readonly sort: number;
}

export class CreateMenuDto extends NavgationInfo {}

export class FindMenuDto {
  @ApiProperty({
    description: '菜单名',
    required: false,
  })
  @IsOptional()
  readonly title: string;
}
