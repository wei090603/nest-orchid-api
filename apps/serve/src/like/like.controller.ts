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
import { ArticleService } from '../article/article.service';
import { CollectDto } from '../collect/dto';
import { LikeService } from './like.service';

@ApiTags('点赞管理')
@Controller('like')
export class LikeController {
  constructor(
    private readonly likeService: LikeService,
    private readonly articleService: ArticleService,
  ) {}

  @Post('')
  @ApiOperation({ description: '添加点赞', summary: '添加点赞' })
  // 此接口需要传递token;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  addArticle(@Body() data: CollectDto, @user() user: User) {
    return this.likeService.add(data, user);
  }

  @Delete(':id')
  @ApiOperation({ description: '删除点赞', summary: '删除点赞' })
  // 此接口需要传递token;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  delArticle(@Param('id') id: string, @user() user: User) {
    return this.likeService.del(+id, user);
  }

  @Get('list/:id')
  @ApiOperation({
    description: '根据用户id获取点赞列表',
    summary: '根据用户id获取点赞列表',
  })
  async findLikeList(@Param('id') id: string) {
    const likeList = await this.likeService.findLikeList(+id);
    return await this.articleService.getCollectLikeList(likeList);
  }
}
