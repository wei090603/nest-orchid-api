import {
  HttpException,
  HttpStatus,
  Inject,
  CACHE_MANAGER,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcryptjs';
import { Repository } from 'typeorm';
import { User } from '@libs/db/entity/user.entity';
import { UserInfo, WxLoginDto, WxUser } from './dto';
import { ConfigService } from '@nestjs/config';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import WXBizDataCrypt from './utils/WXBizDataCrypt';
import { getTemAccount } from 'apps/shared/utils';

import axios from 'axios';
import * as crypto from 'crypto';
import { CacheService } from 'apps/shared/redis';
import { SignService } from '../sign/sign.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly redisService: CacheService,
    private readonly signService: SignService,
  ) {}

  // 生成token
  private createToken(user: Partial<User>) {
    return this.jwtService.sign(user);
  }

  /**
   * @Author: tao.wei
   * @description: 登录验证成功后处理
   * @param {Manager} dto
   * @return {*}
   */
  login(data: User): Object {
    const payload = { id: data.id, account: data.account };
    return { token: this.createToken(payload) };
  }

  /**
   * @Author: tao.wei
   * @description: 用户登录验证
   * @param {*}
   * @return {*}
   */
  public async validateUser(account: string, password: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'id'])
      .addSelect('user.password')
      .addSelect('user.account')
      .addSelect('user.status')
      .where(
        'user.account = :account OR user.email = :email OR user.mobile = :mobile',
        { account, email: account, mobile: account },
      )
      .getOne();
    if (!user) {
      throw new ApiException(HttpStatus.NOT_FOUND, '用户不存在');
    }
    if (!user.status) {
      throw new ApiException(HttpStatus.FORBIDDEN, '用户被禁用');
    }
    if (!compareSync(password, user.password)) {
      throw new ApiException(10400, '用户名或密码不正确');
    }
    return user;
  }

  // 微信授权登录
  async wxLogin(param: WxLoginDto) {
    const { code, user } = param;
    const wxUserInfo = await this.wxUserInfo(code, user);
    let result: User;
    result = await this.userRepository.findOne({
      where: { openId: wxUserInfo.openId },
    });
    if (!result) {
      result = await this.userRepository.save({
        nickName: wxUserInfo.nickName,
        account: getTemAccount('lh'),
        avatar: wxUserInfo.avatarUrl,
        password: getTemAccount(),
        sex: wxUserInfo.gender,
        openId: wxUserInfo.openId,
      });
    }
    const payload = { id: String(result.id), account: result.account };
    return { token: this.jwtService.sign(payload) };
  }

  // 校验微信信息
  async wxUserInfo(code: string, user: WxUser) {
    const AppID = this.configService.get('wx').AppID;
    const AppSecret = this.configService.get('wx').AppSecret;
    const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`;
    const data: any = await axios.get(url);
    if (data.status === 200 && data.data.session_key) {
      const sessionKey = data.data.session_key;
      const { rawData, signature, encryptedData, iv } = user;
      const sha1 = crypto.createHash('sha1');
      sha1.update(rawData);
      sha1.update(sessionKey);
      if (sha1.digest('hex') !== signature) {
        throw new ApiException(10400, '用户签名校验失败');
      }
      const pc = new WXBizDataCrypt(AppID, sessionKey);
      return { ...pc.decryptData(encryptedData, iv), openId: data.data.openid };
    } else {
      throw new ApiException(10400, '微信授权失败');
    }
  }

  /**
   * @Author: tao.wei
   * @description: token 获取个人信息
   * @param {number} id
   * @return {*}
   */
  async findMe(id: number): Promise<UserInfo> {
    const userInfo: string = await this.redisService.get(`user-info-${id}`);
    if (userInfo) return JSON.parse(userInfo);
    // 查询用户信息 今日签到状态
    const [user, isSign] = await Promise.all([
      this.findMeInfo(id),
      this.signService.isMeSign(id),
    ]);

    const userAllInfo = {
      ...user,
      isSign,
    };

    // await this.redisService.set(`user-info-${id}`, userAllInfo, 60 * 60 * 24);
    return userAllInfo;
  }

  async findMeInfo(id: number) {
    return await this.userRepository.findOne({
      select: {
        userTag: {
          id: true,
          title: true,
        },
      },
      relations: {
        userTag: true,
      },
      where: { id },
    });
  }
}
