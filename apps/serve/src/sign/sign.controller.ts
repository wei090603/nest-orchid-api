import { User } from '@libs/db/entity/user.entity';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { user } from 'apps/shared/decorators/user.decorator';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { SignService } from './sign.service';

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
}
