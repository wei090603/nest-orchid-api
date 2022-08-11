import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '用户名', example: '17802093443' })
  @IsString({ message: '用户名不是有效的数据' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly account: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString({ message: '密码不是有效的数据' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

export type WxUser = {
  rawData: string
  signature: string 
  encryptedData: string
  iv: string
}

export class WxLoginDto {
  @ApiProperty({ description: 'code', example: '123456' })
  @IsNotEmpty({ message: 'code不能为空' })
  readonly code: string;

  @ApiProperty({ description: 'user', example: {} })
  @IsNotEmpty({ message: '用户信息' })
  readonly user: WxUser;
}
