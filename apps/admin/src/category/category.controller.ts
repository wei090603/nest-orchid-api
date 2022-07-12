import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { PageCategoryList, FindCategoryDto, CategoryInfo } from './interface';

@ApiTags('文章分类管理')
@ApiBearerAuth()
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({ type: [PageCategoryList] })
  @ApiOperation({ summary: '获取分类列表' })
  async find(@Query() query: FindCategoryDto) {
    return await this.categoryService.find(query);
  }

  @Post()
  @ApiOperation({ summary: '添加分类' })
  async create(@Body() data: CategoryInfo) {
    return this.categoryService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改分类信息' })
  async update(@Param('id') id: string, @Body() data: CategoryInfo) {
    return await this.categoryService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除分类', description: '删除分类' })
  async remove(@Param('id') id: string) {
    return await this.categoryService.remove(+id);
  }

  @Get('all')
  @ApiOkResponse({ type: [CategoryInfo] })
  @ApiOperation({ summary: '获取分类列表-无分页' })
  async findAll() {
    return await this.categoryService.findAll();
  }
}
