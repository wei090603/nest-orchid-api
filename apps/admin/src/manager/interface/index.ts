import {
  IsNotEmpty,
  IsEmail,
  IsMobilePhone,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
  IsNumber,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';

export class CommonManager {
  @ApiProperty({
    description: '姓名',
  })
  @IsString({ message: '不是有效的数据' })
  @MinLength(2, { message: '姓名至少需要2位' })
  readonly name: string;

  @ApiProperty({
    description: '帐号',
    uniqueItems: true, // 唯一
  })
  @IsString({ message: '不是有效的数据' })
  @MinLength(2, { message: '用户名至少需要2位' })
  readonly account: string;

  @ApiProperty({
    description: '邮箱',
    required: false,
  })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @IsOptional()
  @ValidateIf((obj, value) => value)
  readonly email: string;

  @ApiProperty({
    description: '手机号码',
    required: false,
  })
  @IsString({ message: '不是有效的数据' })
  @IsMobilePhone('zh-CN', {}, { each: true, message: '手机格式错误' })
  @IsOptional()
  @ValidateIf((obj, value) => value)
  readonly phone: string;

  @ApiProperty({
    description: '描述',
    required: false,
    example: '',
  })
  @IsString({ message: '不是有效的数据' })
  @IsOptional()
  @ValidateIf((obj, value) => value)
  readonly remark: string;
}

export class CreateManagerDto extends CommonManager {
  @ApiProperty({
    description: '角色',
    example: [1],
  })
  @IsNumber({ allowInfinity: true }, { each: true })
  @IsNotEmpty({ message: '角色不能为空' })
  readonly roles: number[];
}

export class FindManagerDto extends PageOptionsDto {
  @ApiProperty({
    description: '姓名',
    required: false,
  })
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    description: '帐号',
    required: false,
  })
  @IsOptional()
  readonly account: string;

  @ApiProperty({
    description: '手机号',
    required: false,
  })
  @IsOptional()
  readonly phone: string;
}

export class ManagerList extends CommonManager {
  @ApiProperty({
    description: '角色',
    example: ['超级管理员', '测试'],
  })
  readonly roles: number[];

  @ApiProperty({
    description: '帖子类型',
    example: true,
  })
  readonly status: boolean;
}

export class PageManagerList {
  @ApiProperty({
    description: '总数',
    type: [ManagerList],
  })
  list: ManagerList[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
