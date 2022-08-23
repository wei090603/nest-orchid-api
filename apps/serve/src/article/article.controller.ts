import { User } from '@libs/db/entity/user.entity';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { user } from 'apps/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { OptionAuthGuard } from 'apps/shared/guards/option.strategy';
import { ArticleService } from './article.service';
import { ArticleDto, FindArticleDto, SearchArticleDto } from './type';

@ApiTags('文章管理')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '添加文章' })
  create(@Body() createArticleDto: ArticleDto, @user() user: User) {
    return this.articleService.create(createArticleDto, user);
  }

  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  @UseGuards(OptionAuthGuard)
  findAll(@Query() query: FindArticleDto, @user() user: User) {
    return this.articleService.findAll(query, user);
  }

  @Get('search')
  @ApiOperation({ summary: '搜索文章列表' })
  @UseGuards(OptionAuthGuard)
  findSearch(@Query() query: SearchArticleDto, @user() user: User) {
    return this.articleService.findSearch(query, user);
  }

  @Get('hot/:id')
  @ApiOperation({ summary: '获取热门文章列表' })
  @UseGuards(OptionAuthGuard)
  findHot(@Param('id') id: string, @user() user: User) {
    return this.articleService.findHot(+id, user);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: '获取文章详情' })
  @UseGuards(OptionAuthGuard)
  findOne(@Param('id') id: string, @user() user: User) {
    return this.articleService.findOne(+id, user);
  }
}
