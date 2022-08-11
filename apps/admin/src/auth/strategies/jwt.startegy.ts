/*
 * @Description:
 * @Author: tao.wei
 * @Date: 2021-09-09 15:42:00
 */
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { Manager } from '@libs/db/entity/manager.entity';
import { ConfigService } from '@nestjs/config';
import { CacheService } from 'apps/shared/redis';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly service: AuthService,
    configService: ConfigService,
    private redisService: CacheService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 头部获取token
      ignoreExpiration: false, //如果为true，则不验证令牌的过期时间。
      secretOrKey: configService.get('jwt').secret,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: { id: number; account: string },
  ): Promise<Manager> {
    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    // 获取redis的key;
    const cacheToken = await this.redisService.get(`user-token-${payload.id}`);
    //单点登陆验证
    if (token !== JSON.parse(cacheToken)) {
      throw new UnauthorizedException('登录失效，请重新登录！', 'token error');
    }
    return await this.service.findMe(payload.id);
  }
}
