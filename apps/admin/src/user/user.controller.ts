import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PageUserList, FindUserDto } from './interface';
import { UserService } from './user.service';

@ApiTags('用户管理')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: [PageUserList] })
  @ApiOperation({ summary: '获取标签列表' })
  async find(@Query() query: FindUserDto) {
    return await this.userService.find(query);
  }
}
