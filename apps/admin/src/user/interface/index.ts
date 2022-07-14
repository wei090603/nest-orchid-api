import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: '账号',
    uniqueItems: true,
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '标签名不能为空' })
  readonly account: string;
}

export class FindUserDto extends PageOptionsDto {
  @ApiProperty({
    description: '账号',
    required: false,
  })
  @IsOptional()
  readonly account: string;
}

export class PageUserList {
  @ApiProperty({
    description: '总数',
    type: [UserDto],
  })
  list: UserDto[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
