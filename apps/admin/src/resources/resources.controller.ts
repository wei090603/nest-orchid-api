import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ResourcesService } from './resources.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateResourceDto, UpdateResourceDto } from './interface';

@ApiTags('资源管理')
@ApiBearerAuth()
@Controller('resources')
export class ResourcesController {
  constructor(private readonly service: ResourcesService) {}

  @Post()
  @ApiOperation({ summary: '创建菜单', description: '创建菜单' })
  async create(@Body() data: CreateResourceDto) {
    return await this.service.create(data);
  }

  @Get()
  @ApiOperation({ summary: '获取资源列表', description: '获取资源列表' })
  async findAll() {
    return await this.service.findAll();
  }

  @Put(':id')
  @ApiOperation({summary: '根据用户id更新资源', description: '根据用户id更新资源'})
  async update(@Param('id') id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return await this.service.update(+id, updateResourceDto);
  }

  @Delete(':id')
  @ApiOperation({summary: '根据用户id删除资源', description: '根据用户id删除资源'})
  async remove(@Param('id') id: string) {
    return await this.service.remove(+id);
  }
}
