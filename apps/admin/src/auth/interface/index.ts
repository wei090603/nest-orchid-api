import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: '账号', example: 'admin' })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly account: string;

  @ApiProperty({ description: '密码', example: '123456' })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

export class Token {
  @ApiProperty({ description: 'token' })
  token: string;
}
