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
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FindManagerDto, CreateManagerDto } from './interface';
import { PageManagerList } from './interface';
import { ManagerService } from './manager.service';
import { user } from 'apps/shared/decorators/user.decorator';
import { Manager } from '@libs/db/entity/manager.entity';

@ApiTags('后台用户管理')
@ApiBearerAuth()
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Get()
  @ApiOkResponse({ type: [PageManagerList] })
  @ApiOperation({ summary: '获取管理员列表' })
  async findAll(@Query() query: FindManagerDto) {
    return await this.managerService.findAll(query);
  }

  @Post()
  @ApiOperation({ summary: '添加管理员' })
  async create(@Body() data: CreateManagerDto) {
    return this.managerService.create(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: '修改用户信息' })
  async updateInfo(@Param('id') id: string, @Body() data: CreateManagerDto) {
    return await this.managerService.updated(+id, data);
  }

  @Patch('restPassword/:id')
  @ApiOperation({ summary: '重置用户密码' })
  async restPassword(@Param('id') id: string) {
    return await this.managerService.restPassword(+id);
  }

  @Patch('status/:id')
  @ApiOperation({ summary: '修改用户状态' })
  async updateStatus(@Param('id') id: string) {
    return this.managerService.updateStatus(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户', description: '删除用户' })
  async remove(@Param('id') id: string) {
    return await this.managerService.remove(+id);
  }

  @Get('resources')
  @ApiOperation({
    summary: '获取当前用户菜单权限',
    description: '获取当前用户菜单权限',
  })
  async resources(@user() user: Manager) {
    return await this.managerService.resources(user.roles);
  }
}
