import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateUploadDto } from './type';

@ApiBearerAuth()
@ApiTags('文件上传')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateUploadDto })
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file
  }

  @Post('files')
  @UseInterceptors(FileInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return files
  }
}
