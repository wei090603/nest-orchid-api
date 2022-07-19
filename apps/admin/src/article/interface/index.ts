import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
} from 'class-validator';
import { Tag } from '@libs/db/entity/tag.entity';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';

export class ArticleInfo {
  @ApiProperty({
    description: '帖子标题',
    required: false,
  })
  @IsString({ message: '帖子标题不是有效的数据' })
  readonly title: string;

  @ApiProperty({
    description: '帖子内容',
    required: false,
  })
  @IsString({ message: '帖子内容不是有效的数据' })
  readonly content: string;

  @ApiProperty({
    description: '帖子图片',
    required: false,
  })
  @IsArray({ message: '帖子图片不是有效的数据' })
  readonly image: string[];

  @ApiProperty({
    description: '帖子分类',
    example: 1,
    required: false,
  })
  readonly categoryId: number;

  @ApiProperty({
    description: '帖子权限',
    example: 1,
  })
  readonly status: number;

  @ApiProperty({
    description: '帖子类型',
    example: 1,
  })
  readonly type: boolean;

  @ApiProperty({
    description: '帖子标签',
    example: [],
    required: false,
  })
  readonly tag: Tag[];
}
export class CreateArticleDto extends ArticleInfo {}

export class FindArticleDto extends PageOptionsDto {
  @ApiProperty({
    description: '文章名称',
    required: false,
  })
  @IsOptional()
  readonly title?: string;

  @ApiProperty({
    description: '文章内容',
    required: false,
  })
  @IsOptional()
  readonly content?: string;

  @ApiProperty({
    description: '文章分类',
    required: false,
  })
  @IsNumber({}, { message: '不是有效的数据' })
  @IsOptional()
  readonly categoryId?: number;
}

// response
export class PageArticleList {
  @ApiProperty({
    description: '列表',
    type: [PageArticleList],
  })
  list: ArticleInfo[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
