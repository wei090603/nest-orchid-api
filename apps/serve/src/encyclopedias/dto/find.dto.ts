import { Encyclopedias } from '@libs/db/entity/encyclopedias.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class FindEncyclopediaDto extends PageOptionsDto {
  @ApiProperty({
    description: '分类',
    required: false,
    example: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { message: '分类数据格式不正确' })
  readonly categoryId: number;
}

export class PageEncyclopediaList {
  @ApiProperty({
    description: '总数',
    type: [],
  })
  list: any[];

  @ApiProperty({
    description: '总数',
  })
  total: number;
}
