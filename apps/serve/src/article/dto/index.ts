import { Tag } from '@libs/db/entity/tag.entity';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';
import { Type } from 'class-transformer';

import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsInt,
} from 'class-validator';

export class ArticleDto {
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
  @IsOptional()
  @IsArray({ message: '帖子图片不是有效的数据' })
  readonly image: string[];

  @ApiProperty({
    description: '帖子封面图',
    required: false,
  })
  @IsString({ message: '帖子封面图不是有效的数据' })
  readonly coverPicture: string;

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
  readonly type: number;

  @ApiProperty({
    description: '帖子标签',
    example: [],
    required: false,
  })
  readonly tag: Tag[];
}

export class FindArticleDto extends PageOptionsDto {
  @ApiProperty({
    description: '分类',
    required: false,
    example: 2,
  })
  readonly categoryId: number;
}

export class FindUserArticleDto extends PageOptionsDto {
  // @ApiProperty({
  //   description: '用户id',
  //   required: true,
  //   example: 2,
  // })
  // @Type(() => Number)
  // @IsInt()
  // @IsNumber({ maxDecimalPlaces: 255 }, { message: '数据类型不正确' })
  // readonly userId: number;
}

export class SearchArticleDto extends PageOptionsDto {
  @ApiProperty({
    description: '文章标题',
    example: '',
    required: false,
  })
  @IsOptional()
  readonly title: string;
}

export class ArticleListDto extends PartialType(ArticleDto) {
  isLike: boolean;
}

export class UpdateArticleDto extends PartialType(ArticleDto) {
}

export class PageArticleList {
  @ApiProperty({
    description: '总数',
    type: [ArticleListDto],
  })
  list: ArticleListDto[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
