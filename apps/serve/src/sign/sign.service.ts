import { Sign } from '@libs/db/entity/sign.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';

interface ISign {
  signDays: number;
}

interface IService {
  sign: ISign;
}

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(Sign)
    private readonly signRepository: Repository<Sign>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  // 用户今日是否签到
  async isMeSign(userId: number): Promise<boolean> {
    const num = await this.signRepository.count({
      where: {
        userId,
        createdAt: dayjs().format('YYYY-MM-DD') as unknown as Date,
      },
    });
    return !!num;
  }

  // 用户签到
  async create(user: User) {
    // 获取最后一签到记录
    const signRecord = await this.signRepository.findOne({
      where: {
        userId: user.id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    console.log(signRecord, 'signRecord');
    if (signRecord) {
      console.log(dayjs(signRecord.createdAt), 'dayjs(signRecord.createdAt)');
      // 判断签到时间是否时间是否是今天
      if (
        dayjs(signRecord.createdAt).format('YYYY-MM-DD') ===
        dayjs().format('YYYY-MM-DD')
      ) {
        // return {
        //   favs: signRecord.favs,
        //   favsTotal: user.favs + 5,
        // };
        throw new ApiException(10500, '该用户已签到');
      } else {
        // 有上一次签到记录 不与今天相同 判断是否是连续签到
        // 当前日期减去一天 是否相等
        const service: IService = this.configService.get('service');
        console.log(service, 'service');
        if (
          dayjs(signRecord.createdAt).format('YYYY-MM-DD') ===
          dayjs().subtract(1, 'days').format('YYYY-MM-DD')
        ) {
          const count = user.signInCount + 1;
          if (count < service.sign.signDays) {
          } else if (count >= 5 && count < 15) {
          }
        }
      }
    } else {
      await this.signRepository.insert({
        userId: user.id,
        favs: 5,
        createdAt: dayjs().format('YYYY-MM-DD'),
      });
      await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({
          favs: () => 'favs + 5',
          signInCount: 1,
        })
        .where('id = :id', { id: user.id })
        .execute();

      return {
        favs: 5,
        favsTotal: user.favs + 5,
      };
    }
  }
}
