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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FindTagDto, TagInfo, PageTagList } from './interface';
import { TagService } from './tag.service';

@ApiTags('标签管理')
@ApiBearerAuth()
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOkResponse({ type: [PageTagList] })
  @ApiOperation({ summary: '获取标签列表' })
  async find(@Query() query: FindTagDto) {
    return await this.tagService.find(query);
  }

  @Post()
  @ApiOperation({ summary: '添加标签' })
  async create(@Body() data: TagInfo) {
    return this.tagService.create(data);
  }

  @Put(':id')
  @ApiOperation({ summary: '修改标签信息' })
  async update(@Param('id') id: string, @Body() data: TagInfo) {
    return await this.tagService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除标签', description: '删除标签' })
  async remove(@Param('id') id: string) {
    return await this.tagService.remove(+id);
  }

  @Get('all')
  @ApiOkResponse({ type: [TagInfo] })
  @ApiOperation({ summary: '获取标签列表-无分页' })
  async findAll() {
    return await this.tagService.findAll();
  }
}
