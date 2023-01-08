import { User } from '@libs/db/entity/user.entity';
import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { user } from 'apps/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { SignService } from './sign.service';

@ApiTags('签到管理')
@Controller('sign')
export class SignController {
  constructor(private readonly signService: SignService) {}

  @Get()
  @ApiOperation({ description: '用户签到', summary: '用户签到' })
  // 此接口需要传递token;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@user() user: User) {
    return this.signService.create(user);
  }

  @Get('record')
  @ApiOperation({ description: '用户签到记录', summary: '用户签到记录' })
  // 此接口需要传递token;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findRecord(@user() user: User, @Query('month', ParseIntPipe) month: number) {
    return this.signService.findRecord(user, month);
  }

  @Get('signInfo')
  @ApiOperation({ description: '用户签到信息', summary: '用户签到信息' })
  // 此接口需要传递token;
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findSignInfo(@user() user: User) {
    const [signCount, continuousCount, isSign] = await Promise.all([
      this.signService.getSignTotalCount(user),
      this.signService.getSignContinuousCount(user),
      this.signService.isMeSign(user.id),
    ]);

    return { signCount, continuousCount, isSign };
  }

  @Get('new')
  @ApiOperation({ description: '最新签到列表', summary: '最新签到列表' })
  async findNewList() {
    return await this.signService.findNewList();
  }

  @Get('today')
  @ApiOperation({
    description: '今日最快签到列表',
    summary: '今日最快签到列表',
  })
  async findTodayList() {
    return this.signService.findTodayList();
  }

  @Get('rank')
  @ApiOperation({
    description: '总榜签到列表',
    summary: '总榜签到列表',
  })
  async findRankList() {
    return this.signService.findRankList();
  }
}
