import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Manager } from '@libs/db/entity/manager.entity';
import { CreateNoticDto, FindNoticeDto, PageNoticeList } from './interface';
import { NoticeService } from './notice.service';
import { user } from 'apps/shared/decorators/user.decorator';

@ApiTags('通知公告管理')
@ApiBearerAuth()
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Get()
  @ApiOkResponse({ type: [PageNoticeList] })
  @ApiOperation({ summary: '通知公告列表' })
  async findAll(@Query() query: FindNoticeDto) {
    return await this.noticeService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: '添加通知公告' })
  async create(@Body() data: CreateNoticDto, @user() user: Manager) {
    return this.noticeService.create(data, user.account);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改通知信息' })
  async update(@Param('id') id: string, @Body() data: CreateNoticDto) {
    return await this.noticeService.update(+id, data);
  }

  @Get(':id')
  @ApiOperation({ summary: '获取通告详情' })
  async findOne(@Param('id') id: string) {
    return await this.noticeService.findOne(+id);
  }
}
