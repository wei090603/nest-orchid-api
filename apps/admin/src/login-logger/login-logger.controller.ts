import { Controller, Delete, Get, Param, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { LoginLoggerService } from './login-logger.service';
import { PageLoginLoggerList, FindLoginLoggerDto } from './interface';

@ApiTags('登录日志管理')
@ApiBearerAuth()
@Controller('login-logger')
export class LoginLoggerController {
  constructor(private readonly loginLoggerService: LoginLoggerService) {}

  @Get()
  @ApiOkResponse({ type: [PageLoginLoggerList] })
  @ApiOperation({ summary: '获取登录日志列表' })
  async findAll(@Query() query: FindLoginLoggerDto) {
    return await this.loginLoggerService.findAll(query);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除登录日志', description: '删除登录日志' })
  async remove(@Param('id') id: string) {
    return await this.loginLoggerService.remove(+id);
  }
}
