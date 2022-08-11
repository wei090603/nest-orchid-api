import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { User } from '@libs/db/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly service: AuthService) {
    super({
      // 用与修改前端传过来的参数
      usernameField: 'account',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  // 写入到req.user
  async validate(account: string, password: string): Promise<User> {
    return await this.service.validateUser(account, password);
  }
}
