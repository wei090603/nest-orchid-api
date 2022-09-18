import { ApiProperty } from "@nestjs/swagger";
import { PageOptionsDto } from "apps/shared/dto/page.dto";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TagInfo {
  @ApiProperty({
    description: 'id',
  })
  readonly id: number;
  
  @ApiProperty({
    description: '标签名',
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '标签名不能为空' })
  readonly name: string;
}

export class TagList {
  @ApiProperty({
    description: '列表',
    type: [TagInfo]
  })
  data: TagInfo[]
}

export class FindTagDto { 
  @ApiProperty({
    description: '标签名',
    required: false,
  })
  @IsOptional()
  readonly name: string;
}

export class TagArticle extends PageOptionsDto {
  @ApiProperty({
    description: 'id',
  })
  readonly id: number;
}

