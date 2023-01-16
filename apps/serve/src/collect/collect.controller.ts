import { User } from '@libs/db/entity/user.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { user } from 'apps/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { CollectService } from './collect.service';
import { CollectDto } from './dto';

@ApiTags('收藏管理')
@Controller('collect')
export class CollectController {
  constructor(private readonly collectService: CollectService) {}

  @Post()
  @ApiOperation({ description: '添加收藏', summary: '添加收藏' })
  // 此接口需要传递token;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  addArticle(@Body() data: CollectDto, @user() user: User) {
    return this.collectService.addArticle(data, user);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除收藏', summary: '删除收藏' })
  // 此接口需要传递token;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  delArticle(@Param('id') id: string, @user() user: User) {
    return this.collectService.delArticle(+id, user);
  }

  @Get('list/:id')
  @ApiOperation({
    description: '根据用户id获取收藏列表',
    summary: '根据用户id获取收藏列表',
  })
  findCollectList(@Param('id') id: string) {
    return this.collectService.findCollectList(+id);
  }
}
