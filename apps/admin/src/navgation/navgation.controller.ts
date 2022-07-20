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
import {
  CreateNavgationDto,
  FindNavgationDto,
  NavgationInfo,
} from './interface';

@ApiTags('导航管理')
@ApiBearerAuth()
@Controller('navgation')
export class NavgationController {
  constructor(private readonly navgationService: NavgationService) {}

  @Get()
  @ApiOkResponse({ type: [NavgationInfo] })
  @ApiOperation({ summary: '获取菜单列表-无分页' })
  async findAll(@Query() query: FindNavgationDto) {
    return await this.navgationService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: '添加菜单' })
  async create(@Body() data: CreateNavgationDto) {
    return this.navgationService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改菜单信息' })
  async update(@Param('id') id: string, @Body() data: CreateNavgationDto) {
    return await this.navgationService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除菜单', description: '删除菜单' })
  async remove(@Param('id') id: string) {
    return await this.navgationService.remove(+id);
  }
}
