import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ArticleService } from './article.service';
import { CreateArticleDto, FindArticleDto } from './interface';

@ApiTags('文章管理')
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  @ApiOperation({ summary: '获取文章列表' })
  find(@Query() query: FindArticleDto) {
    return this.articleService.find(query);
  }

  @Post()
  @ApiOperation({ summary: '添加文章' })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto);
  }

  // @Patch(':id')
  // @ApiOperation({ summary: '修改文章信息' })
  // async update(@Param('id') id: string, @Body() data: CategoryInfo) {
  //   return await this.categoryService.update(+id, data);
  // }

  // @Delete(':id')
  // @ApiOperation({ summary: '删除文章' })
  // async remove(@Param('id') id: string) {
  //   return await this.categoryService.remove(+id);
  // }

  @Get(':id')
  @ApiOperation({ summary: '获取文章详情' })
  findOne(@Param('id') id: string) {
    return this.articleService.findOne(+id);
  }
}
