import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CategoryInfo {
  id: number
  
  @ApiProperty({
    description: '分类名',
    uniqueItems: true,
  })
  @IsString({ message: '不是有效的数据' })
  @IsNotEmpty({ message: '分类名不能为空' })
  readonly title: string;
}

export class CategoryList {
  @ApiProperty({
    description: '列表',
    type: [CategoryInfo]
  })
  data: CategoryInfo[]
}