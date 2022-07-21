import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NavgationInfo } from './dto';
import { NavgationService } from './navgation.service';

@ApiTags('导航管理')
@Controller('navgation')
export class NavgationController {
  constructor(private readonly navgationService: NavgationService) {}

  @Get()
  @ApiOkResponse({ type: [NavgationInfo] })
  @ApiOperation({ summary: '获取菜单列表-无分页' })
  async findAll() {
    return await this.navgationService.findAll();
  }
}
