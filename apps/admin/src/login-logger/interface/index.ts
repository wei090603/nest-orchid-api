import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';

export class LoginLoggerInfo {
  @ApiProperty({
    description: '登录用户名',
  })
  readonly account: string;

  @ApiProperty({
    description: '登录地址',
  })
  readonly loginAddress: string;

  @ApiProperty({
    description: '登录ip',
  })
  readonly loginIp: string;
}

export class FindLoginLoggerDto extends PageOptionsDto {
  @ApiProperty({
    description: '用户名',
    required: false,
  })
  @IsOptional()
  readonly account: string;
}

export class PageLoginLoggerList {
  @ApiProperty({
    description: '列表',
    type: [LoginLoggerInfo],
  })
  list: LoginLoggerInfo[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
