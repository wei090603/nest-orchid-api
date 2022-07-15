import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { NavgationService } from './navgation.service';
import { CreateMenuDto, FindMenuDto, NavgationInfo } from './interface';

@Controller('navgation')
export class NavgationController {
  constructor(private readonly navgationService: NavgationService) {}

  @Get()
  @ApiOkResponse({ type: [NavgationInfo] })
  @ApiOperation({ summary: '获取菜单列表-无分页' })
  async findAll(@Query() query: FindMenuDto) {
    return await this.navgationService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: '添加菜单' })
  async create(@Body() data: CreateMenuDto) {
    return this.navgationService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改菜单信息' })
  async update(@Param('id') id: string, @Body() data: CreateMenuDto) {
    return await this.navgationService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单', description: '删除菜单' })
  async remove(@Param('id') id: string) {
    return await this.navgationService.remove(+id);
  }
}
