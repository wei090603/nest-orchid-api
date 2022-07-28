import { ApiHideProperty, ApiProperty, OmitType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';

enum Type {
  Notify = 1,
  Announcement = 2,
}

export class NoticeInfo {
  @ApiProperty({
    description: '标题',
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '标签名不能为空' })
  readonly title: string;

  @ApiProperty({
    description: '内容',
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '内容不能为空' })
  readonly content: string;

  @ApiProperty({
    description: '类型 1-通知 2-公告',
    example: Type.Notify,
  })
  @IsNumber({ maxDecimalPlaces: 10 }, { message: '不是有效的数据' })
  readonly type: number;

  // @ApiProperty({
  //   description: '状态 false-未发布 true-已发布',
  //   required: false,
  //   example: true,
  // })
  // @IsOptional()
  // @IsBoolean({ message: '不是有效的数据' })
  // readonly status: boolean;
}

export class CreateNoticDto extends NoticeInfo {}

export class FindNoticeDto extends PageOptionsDto {
  @ApiProperty({
    description: '标题',
    required: false,
  })
  @IsOptional()
  readonly title: string;

  @ApiProperty({
    description: '创建人',
    required: false,
  })
  @IsOptional()
  readonly createBy: string;
}

export class NoticeListDto extends NoticeInfo {
  @ApiProperty({
    description: '创建人',
    required: false,
  })
  @ApiHideProperty()
  readonly createBy: string;
}

export class PageNoticeList {
  @ApiProperty({
    description: '列表',
    type: [NoticeListDto],
  })
  list: NoticeListDto[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
