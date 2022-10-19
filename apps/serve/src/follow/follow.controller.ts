import { User } from '@libs/db/entity/user.entity';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { user } from 'apps/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { FollowDto } from './dto';
import { FollowService } from './follow.service';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  @ApiOperation({ description: '添加关注', summary: '添加关注' })
  // 此接口需要传递token;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: FollowDto, @user() user: User) {
    return this.followService.create(dto, user);
  }

  @Delete()
  @ApiOperation({ description: '删除关注', summary: '删除关注' })
  // 此接口需要传递token;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  delete(@Param('id') id: string, @user() user: User) {
    return this.followService.delete(+id, user);
  }
}
