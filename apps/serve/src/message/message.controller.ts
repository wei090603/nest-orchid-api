import { User } from '@libs/db/entity/user.entity';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { user } from 'apps/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { FindMsgListDto } from './dto';
import { MessageService } from './message.service';

@ApiTags('消息管理')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('list/like')
  @ApiOperation({
    description: '获取当前用户点赞消息列表',
    summary: '获取当前用户点赞消息列表',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getLikeList(@Query() query: FindMsgListDto, @user() user: User) {
    return this.messageService.getLikeList(query, +user.id);
  }

  @Get('list/follow')
  @ApiOperation({
    description: '获取当前用户关注消息列表',
    summary: '获取当前用户关注消息列表',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getFollowList(@Query() query: FindMsgListDto, @user() user: User) {
    return this.messageService.getFollowList(query, +user.id);
  }

  @Get('list/comment')
  @ApiOperation({
    description: '获取当前用户评论消息列表',
    summary: '获取当前用户评论消息列表',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getCommentList(@Query() query: FindMsgListDto, @user() user: User) {
    return this.messageService.getCommentList(query, +user.id);
  }
}
