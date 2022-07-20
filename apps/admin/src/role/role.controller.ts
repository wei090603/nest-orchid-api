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
import {
  CommonRoles,
  FindRolesDto,
  ResourcesDto,
  UpdateRoleDto,
} from './interface';
import { PageRolesList } from './interface';
import { RoleService } from './role.service';

@ApiTags('角色管理')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOkResponse({ type: [PageRolesList] })
  @ApiOperation({ summary: '获取角色列表' })
  async findAll(@Query() query: FindRolesDto) {
    return await this.roleService.findAll(query);
  }

  @Get('list')
  @ApiOkResponse({ type: [CommonRoles] })
  @ApiOperation({ summary: '获取角色列表-无分页' })
  async list() {
    return await this.roleService.list();
  }

  @Post()
  @ApiOperation({ summary: '添加角色' })
  async register(@Body() data: CommonRoles) {
    return this.roleService.create(data);
  }

  @Get(':id')
  @ApiOperation({
    summary: '根据ID获取角色信息',
    description: '根据ID获取角色信息',
  })
  async getRoleMenu(@Param('id') id: number) {
    return await this.roleService.roleMenu(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改角色信息', description: '修改角色信息' })
  async update(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return await this.roleService.update(+id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除角色', description: '删除菜单' })
  async remove(@Param('id') id: string) {
    return await this.roleService.remove(+id);
  }

  @Patch('resources/:id')
  @ApiOperation({
    summary: '角色添加资源权限',
    description: '角色添加资源权限',
  })
  async resources(@Param('id') id: string, @Body() data: ResourcesDto) {
    return this.roleService.resources(+id, data);
  }
}
