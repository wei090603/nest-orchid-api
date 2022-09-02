import { Inject, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '@libs/db/entity/manager.entity';
import { Repository } from 'typeorm';
import { compareSync } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { LoginLogger } from '@libs/db/entity/loginLogger.entity';
import { IpService } from '@libs/ip';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { CacheService } from 'apps/shared/redis';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Manager)
    private readonly authRepository: Repository<Manager>,
    @InjectRepository(LoginLogger)
    private readonly loginLoggerRepository: Repository<LoginLogger>,
    private readonly jwtService: JwtService,
    private readonly iptoaddressService: IpService,
    private readonly redisService: CacheService,
  ) {}

  public async login(manager: Manager, ip: string): Promise<{ token: string }> {
    // 记录登录地址
    const loginAddress = await this.iptoaddressService.IpToAddress(ip);
    await this.loginLoggerRepository.insert({
      loginAddress,
      loginIp: ip,
      manager,
    });
    const payload = { id: String(manager.id), account: manager.account };
    const token = this.jwtService.sign(payload);
    await this.redisService.set(
      `user-token-${manager.id}`,
      token,
      60 * 60 * 24,
    ); // 在这里使用redis
    return { token };
  }

  public async validateUser(
    account: string,
    password: string,
  ): Promise<Manager> {
    const user = await this.authRepository
      .createQueryBuilder('manager')
      .select([
        'manager.id',
        'manager.password',
        'manager.account',
        'manager.status',
      ])
      .where('manager.account = :account', { account })
      .getOne();
    console.log(user, 'user');
    if (!user) throw new ApiException(10404, '用户不存在');
    if (!user.status) throw new ApiException(10403, '用户被禁用');
    if (!compareSync(password, user.password))
      throw new ApiException(10400, '用户名或密码不正确');
    return user;
  }

  async findMe(id: number): Promise<Manager> {
    let userInfo: Manager;
    const info = await this.redisService.get(`user-info-${id}`);
    userInfo = JSON.parse(info);
    if (!userInfo) {
      userInfo = await this.authRepository
        .createQueryBuilder('auth')
        .leftJoinAndSelect('auth.roles', 'roles')
        .leftJoinAndSelect(
          'roles.resources',
          'resources',
          'resources.type = :type',
          { type: 'button' },
        )
        .select('auth')
        .addSelect('roles.id')
        .addSelect('roles.mark')
        .addSelect('resources.title')
        .addSelect('resources.path')
        .where('auth.id = :id', { id })
        .getOne();
      this.redisService.set(`user-info-${id}`, userInfo, 60 * 60 * 24);
    }
    return userInfo;
  }
}
