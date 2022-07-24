import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AdvertiseService } from './advertise.service';
import { AdvertiseInfo, FindAdvertiseDto } from './interface';
import { PageAdvertiseList } from './interface';

@ApiTags('广告管理')
@ApiBearerAuth()
@Controller('advertise')
export class AdvertiseController {
  constructor(private readonly advertiseService: AdvertiseService) {}

  @Get()
  @ApiOkResponse({ type: [PageAdvertiseList] })
  @ApiOperation({ summary: '获取广告列表' })
  async findAll(@Query() query: FindAdvertiseDto) {
    return await this.advertiseService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: '添加广告' })
  async create(@Body() data: AdvertiseInfo) {
    return this.advertiseService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改广告信息' })
  async update(@Param('id') id: string, @Body() data: AdvertiseInfo) {
    return await this.advertiseService.update(+id, data);
  }

  @Patch('status/:id')
  @ApiOperation({ summary: '修改广告状态' })
  async updateStatus(@Param('id') id: string) {
    return this.advertiseService.updateStatus(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除广告', description: '删除广告' })
  async remove(@Param('id') id: string) {
    return await this.advertiseService.remove(+id);
  }
}
