import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

enum type {
  MENU = 'menu',
  BUTTON = 'button'
}

export class CreateResourceDto {
  @ApiProperty({ description: '父级id', example: '' })
  readonly parentId: number;

  @ApiProperty({ description: '菜单标题', example: '系统管理' })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '菜单名称不能为空' })
  readonly title: string;

  @ApiProperty({ description: '类型', example: type.MENU,  enum: type })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '所属类型不能为空' })
  readonly type: string;

  @ApiProperty({ description: '图标', required: false, example: 'el-icon-user'})
  @IsString({ message: '不是有效的数据' })
  readonly icon: string;

  @ApiProperty({ description: '路径', required: true, example: 'system', uniqueItems: true})
  @IsString({ message: '不是有效的数据' })
  readonly path: string;

  @ApiProperty({ description: '组件路径', required: true, example: 'system', })
  @IsString({ message: '不是有效的数据' })
  @ValidateIf((obj, value) => obj.type === 'menu')
  readonly component: string;

  @ApiProperty({
    description: '排序',
  })
  @IsNumber({}, { message: '不是有效的数据' })
  @ValidateIf((obj, value) => value)
  readonly sort: number;
  
  @ApiProperty({
    description: '状态 false-隐藏 true-显示',
    example: true
  })
  @IsOptional()
  @IsBoolean({ message: '不是有效的数据' })
  readonly status: boolean;
}

export class UpdateResourceDto extends PartialType(CreateResourceDto) {}