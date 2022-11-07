import { Sign } from '@libs/db/entity/sign.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import * as dayjs from 'dayjs';
import { Between, Repository } from 'typeorm';
import { SignDayEnum } from 'apps/serve/common/contants/business.contants';

interface ISign {
  (): () => boolean;
}

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(Sign)
    private readonly signRepository: Repository<Sign>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
    const currentDay = dayjs().format('YYYY-MM-DD');
    // 获取最后一签到记录
    const signRecord = await this.signRepository.findOne({
      where: {
        userId: user.id,
      },
      order: {
        createdAt: 'DESC',
      },
    });
    const result = {
      favs: 0,
      favsTotal: 0,
      createdAt: currentDay,
    };
    // 是否是第一次签到
    if (signRecord) {
      // 判断签到时间是否时间是否是今天
      if (dayjs(signRecord.createdAt).format('YYYY-MM-DD') === currentDay) {
        throw new ApiException(10500, '该用户已签到');
      } else {
        // 有上一次签到记录 不与今天相同 判断是否是连续签到
        // 当前日期减去一天 是否相等
        if (
          dayjs(signRecord.createdAt).format('YYYY-MM-DD') ===
          dayjs().subtract(1, 'days').format('YYYY-MM-DD')
        ) {
          const count = user.signInCount + 1;
          const fav = this.getFavsSignDay(count);
          this.userRepository
            .createQueryBuilder()
            .update(User)
            .set({
              favs: () => `favs + ${fav}`,
              signInCount: count,
            })
            .where('id = :id', { id: user.id })
            .execute();
          result.favs = fav;
          result.favsTotal = user.favs + fav;
        } else {
          this.firstSign(user);
          result.favs = 5;
          result.favsTotal = user.favs + 5;
        }
      }
    } else {
      this.firstSign(user);
      result.favs = 5;
      result.favsTotal = user.favs + 5;
    }
    return result;
  }

  // 判断用户连续签到天数 返回对应分数
  getFavsSignDay(count: number): number {
    const map: any[] = [
      [() => count < SignDayEnum.fiveDay, 50],
      [
        () => count >= SignDayEnum.fiveDay && count < SignDayEnum.fifteenDay,
        100,
      ],
      [
        () => count >= SignDayEnum.fifteenDay && count < SignDayEnum.thirtyDay,
        150,
      ],
      [
        () =>
          count >= SignDayEnum.thirtyDay && count < SignDayEnum.oneHundredDay,
        200,
      ],
      [
        () => count >= SignDayEnum.oneHundredDay && count < SignDayEnum.yearDay,
        300,
      ],
      [() => count >= SignDayEnum.yearDay, 500],
    ];
    const target = map.find((item) => item[0]());
    return target[1];
  }

  // 第一次签到或中断签到
  async firstSign(user: User) {
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
  }

  // 查询用户签到记录
  async findRecord(user: User, month: number = 11): Promise<Sign[]> {
    const date = new Date();
    date.setDate(1);
    // const dateStart = date.getFullYear() + '-' + month + '-' + date.getDate();
    const dateStart = dayjs(
      `${date.getFullYear()}-${month}-${date.getDate()}`,
    ).format('YYYY-MM-DD');
    const dateEnd = dayjs(`${date.getFullYear()}-${month}-00`).format(
      'YYYY-MM-DD',
    );
    console.log(dateStart, dateEnd, 'lastDay');

    console.log(user.id, 'user');
    return this.signRepository.find({
      select: ['createdAt'],
      where: {
        userId: 10,
        createdAt: Between(
          dayjs(dateStart).format('YYYY-MM-DD') as unknown as Date,
          dayjs('2022-11-7').format('YYYY-MM-DD') as unknown as Date,
        ),
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }
}
