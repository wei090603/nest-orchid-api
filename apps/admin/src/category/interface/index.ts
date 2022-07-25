import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsInt, Min } from 'class-validator';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';

export class CategoryInfo {
  @ApiProperty({
    description: '父级ID',
    example: 0,
  })
  @IsInt()
  @Min(0)
  @IsNotEmpty({ message: '父级ID不能为空' })
  readonly parentId: number;

  // @ApiProperty({
  //   description: '级数',
  //   example: 0,
  // })
  // @IsInt()
  // @Min(0)
  // @IsNotEmpty({ message: '级数不能为空' })
  // readonly grade: number;

  @ApiProperty({
    description: '分类名',
    uniqueItems: true,
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '分类名不能为空' })
  readonly title: string;
}

export class FindCategoryDto extends PageOptionsDto {
  @ApiProperty({
    description: '分类名',
    required: false,
  })
  @IsOptional()
  readonly title: string;
}

// response
export class PageCategoryList {
  @ApiProperty({
    description: '总数',
    type: [CategoryInfo],
  })
  list: CategoryInfo[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
