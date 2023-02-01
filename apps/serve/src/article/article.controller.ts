import { User } from '@libs/db/entity/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { user } from 'apps/shared/decorators/user.decorator';
import { PageResult } from 'apps/shared/dto/page.dto';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { OptionAuthGuard } from 'apps/shared/guards/option.strategy';
import { CollectService } from '../collect/collect.service';
import { LikeService } from '../like/like.service';
import { ArticleService } from './article.service';
import {
  ArticleDto,
  ArticleListDto,
  FindArticleDto,
  FindUserArticleDto,
  PageArticleList,
  SearchArticleDto,
  UpdateArticleDto,
} from './dto';

@ApiTags('文章管理')
@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService,
    private readonly collectService: CollectService,
    private readonly likeService: LikeService,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '添加文章' })
  create(@Body() createArticleDto: ArticleDto, @user() user: User) {
    return this.articleService.create(createArticleDto, user);
  }

  @Get()
  @ApiOkResponse({ type: [PageArticleList] })
  @ApiOperation({ summary: '获取文章列表' })
  @UseGuards(OptionAuthGuard)
  async findAll(
    @Query() query: FindArticleDto,
    @user() user: User,
  ): Promise<PageResult<ArticleListDto>> {
    const { list, total } = await this.articleService.findAll(query);
    const artileList = await this.likeService.isMyLikeList(user.id, list);
    return {
      list: artileList,
      total,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改文章' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() createArticleDto: UpdateArticleDto,
    @user() user: User,
  ) {}

  @Get('search')
  @ApiOperation({ summary: '搜索文章列表' })
  @UseGuards(OptionAuthGuard)
  findSearch(@Query() query: SearchArticleDto, @user() user: User) {
    return this.articleService.findSearch(query, user);
  }

  @Get('hot/:id')
  @ApiOperation({ summary: '根据分类获取热门文章列表' })
  @UseGuards(OptionAuthGuard)
  findHot(@Param('id') id: string, @user() user: User) {
    return this.articleService.findHot(+id, user);
  }

  @Get('hot')
  @ApiOperation({ summary: '不根据分类获取热门文章列表' })
  findHotList() {
    return this.articleService.findHotList();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取文章详情' })
  @UseGuards(OptionAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number, @user() user: User) {
    const [articleInfo, isCollect, isLike] = await Promise.all([
      this.articleService.findOne(id),
      this.collectService.isMyCollect(user.id, id),
      this.likeService.isMyLike(user.id, id),
    ]);
    return {
      ...articleInfo,
      isCollect,
      isLike,
    };
  }
}
