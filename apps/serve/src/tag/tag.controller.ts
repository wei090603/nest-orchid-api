import { User } from '@libs/db/entity/user.entity';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { user } from 'apps/shared/decorators/user.decorator';
import { OptionAuthGuard } from 'apps/shared/guards/option.strategy';
import { FindArticleDto } from '../article/dto';
import { TagService } from './tag.service';
import { FindTagDto, TagArticle, TagList } from './dto';

@ApiTags('标签管理')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @ApiOkResponse({ type: TagList })
  @ApiOperation({ summary: '获取标签列表' })
  async findAll(@Query() query: FindTagDto) {
    return await this.tagService.findAll(query);
  }

  @Get('hot')
  @ApiOkResponse({ type: TagList })
  @ApiOperation({ summary: '获取热门标签列表' })
  async findHot() {
    return await this.tagService.findHot();
  }

  @Get('article')
  @UseGuards(OptionAuthGuard)
  @ApiOkResponse({ type: [FindArticleDto] })
  @ApiOperation({ summary: '根据标签获取相关文章' })
  async findArticle(@Query() query: TagArticle, @user() user: User) {
    return await this.tagService.findArticle(query, user);
  }


  @Get(':id')
  @ApiOperation({ summary: '获取标签详情' })
  async findOne(@Param('id') id: string) {
    return await this.tagService.findOne(+id);
  }
}
