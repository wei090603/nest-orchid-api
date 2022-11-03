import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { User } from '@libs/db/entity/user.entity';

export class RegisterCode {
  @ApiProperty({
    description: '邮箱',
    uniqueItems: true, // 唯一
  })
  @IsNotEmpty({ message: '邮箱不能为空' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  readonly email: string;
}

export class CreateUserDto extends RegisterCode {
  @ApiProperty({
    description: '密码',
  })
  @MinLength(6, { message: '密码至少六位' })
  @IsString({ message: '密码数据格式错误' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;

  // @ApiProperty({
  //   description: '验证码',
  // })
  // @IsNotEmpty({ message: '验证码不能为空' })
  // @IsString({ message: '密码数据格式错误' })
  // readonly code: string;
}

export class UpdateUserDto {
  @ApiProperty({
    description: '昵称',
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '昵称不能为空' })
  @MinLength(2, { message: '昵称至少需要两位' })
  readonly nickName: string;

  // @ApiProperty({
  //   description: '帐号',
  //   uniqueItems: true, // 唯一
  // })
  // @IsString({ message: '用户名不是有效的数据' })
  // @IsNotEmpty({ message: '用户名不能为空' })
  // @MinLength(6, { message: '用户名至少需要六位' })
  // readonly account: string;

  @ApiProperty({
    description: '头像',
  })
  readonly avatar: string;

  @ApiProperty({ description: '年龄', example: 20 })
  @IsNumber()
  readonly age: number;

  @ApiProperty({ description: '性别 1-true女 2-false男', example: true })
  @IsBoolean()
  readonly sex: boolean;

  @ApiProperty({
    description: '是否允许获取位置',
    example: true,
  })
  readonly position: boolean;

  @ApiProperty({
    description: '当前位置',
  })
  readonly location: string;
}

export class UserInfoDto extends PartialType(User) {
  followNum: number;
  followedNum: number;
  isFollow: boolean;
}

export class UserFollowDto extends PartialType(User) {
  isFollow: boolean;
}
