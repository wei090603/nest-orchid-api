import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Req,
  Get,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Manager } from '@libs/db/entity/manager.entity';
import { AuthService } from './auth.service';
import { LoginDto, Token } from './interface';
import { Public } from 'apps/shared/guards/constants';
import { user } from 'apps/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @ApiOkResponse({ type: Token })
  @ApiOperation({ summary: '用户登录' })
  @UseGuards(AuthGuard('local')) // 根据策略名称 守卫进入不同策略
  async login(@Body() dto: LoginDto, @Req() req: any, @Request() request: any) {
    return this.authService.login(req.user, request.ip);
  }

  @Get()
  @ApiOperation({ summary: '返回当前用户登录信息' })
  @ApiBearerAuth() // 此接口需要传递token;
  userInfo(@user() userInfo: Manager) {
    return userInfo;
  }

  @Get('loginOut')
  @ApiOperation({ summary: '退出登录' })
  @ApiBearerAuth() // 此接口需要传递token;
  async loginOut(@user() user: Manager) {
    // await this.cacheManager.del(user.id.toString());
  }
}
