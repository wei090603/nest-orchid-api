import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class TagInfo {
  @ApiProperty({
    description: '标签名',
    uniqueItems: true,
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '标签名不能为空' })
  readonly name: string;
}

export class FindTagDto extends PageOptionsDto {
  @ApiProperty({
    description: '标签名',
    required: false,
  })
  @IsOptional()
  readonly name: string;
}

export class PageTagList {
  @ApiProperty({
    description: '列表',
    type: [TagInfo],
  })
  list: TagInfo[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
