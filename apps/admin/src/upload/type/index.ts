import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateUploadDto {
  @ApiProperty({
    description: '文件',
  })
  @ApiProperty({ type: 'string', format: 'binary' })
  @IsNotEmpty({ message: '文件不能为空' })
  readonly file: any;
}
