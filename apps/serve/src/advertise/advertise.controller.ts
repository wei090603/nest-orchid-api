import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdvertiseService } from './advertise.service';
import { AdvertiseList, FindAdvertiseDto } from './dto';

@ApiTags('广告管理')
@Controller('advertise')
export class AdvertiseController {
  constructor(private readonly advertiseService: AdvertiseService) {}

  @Get()
  @ApiOkResponse({ type: AdvertiseList })
  @ApiOperation({ summary: '获取广告列表' })
  async findAll(@Query() query: FindAdvertiseDto) {
    return await this.advertiseService.findAll(query);
  }
}
