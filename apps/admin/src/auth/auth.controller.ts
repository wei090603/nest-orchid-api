import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Req,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Manager } from '@libs/db/entity/manager.entity';
import { AuthService } from './auth.service';
import { LoginDto, Token } from './interface';
import { Public } from 'apps/shared/decorators/public.decorator';
import { user } from 'apps/shared/decorators/user.decorator';
import { Permission } from 'apps/shared/decorators/permission.decorator';
import { CacheService } from 'apps/shared/redis';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly redisService: CacheService,
  ) {}

  @Post('login')
  @Public()
  @Permission()
  @ApiOkResponse({ type: Token })
  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local')) // 根据策略名称 守卫进入不同策略
  async login(@Body() dto: LoginDto, @Req() req: any, @Request() request: any) {
    return this.authService.login(req.user, request.ip);
  }

  @Get()
  @Permission()
  @ApiOperation({ summary: '返回当前用户登录信息' })
  @ApiBearerAuth() // 此接口需要传递token;
  userInfo(@user() userInfo: Manager) {
    return userInfo;
  }

  @Get('loginOut')
  @Permission()
  @ApiOperation({ summary: '退出登录' })
  @ApiBearerAuth() // 此接口需要传递token;
  async loginOut(@user() user: Manager) {
    await this.redisService.del(`user-info-${user.id}`);
  }
}
