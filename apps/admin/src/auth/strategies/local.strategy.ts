import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { Manager } from '@libs/db/entity/manager.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly service: AuthService) {
    super({
      // 用与修改亲前端传过来的参数
      usernameField: 'account',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // 写入到req.user
  async validate(account: string, password: string): Promise<Manager> {
    return await this.service.validateUser(account, password);
  }
}
