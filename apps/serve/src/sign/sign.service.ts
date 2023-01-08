import { Sign } from '@libs/db/entity/sign.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import * as dayjs from 'dayjs';
import { Between, Repository } from 'typeorm';
import { SignDayEnum } from 'apps/serve/common/contants/business.contants';
import { UserService } from '../user/user.service';

interface ISign {
  (): () => boolean;
}

const select = [
  'user.id',
  'user.nickName',
  'user.account',
  'user.avatar',
  'user.favs',
  'user.signText',
];

@Injectable()
export class SignService {
  constructor(
    @InjectRepository(Sign)
    private readonly signRepository: Repository<Sign>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
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
            .update()
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
          result.favs = 50;
          result.favsTotal = user.favs + 50;
        }
      }
    } else {
      this.firstSign(user);
      result.favs = 50;
      result.favsTotal = user.favs + 50;
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
    console.log(user, '111');
    await this.signRepository.insert({
      userId: user.id,
      favs: 50,
      createdAt: dayjs().format('YYYY-MM-DD'),
    });
    await this.userRepository
      .createQueryBuilder()
      .update()
      .set({
        favs: () => 'favs + 50',
        signInCount: 1,
      })
      .where('id = :id', { id: user.id })
      .execute();
  }

  // 查询用户签到记录
  async findRecord(user: User, month: number): Promise<Sign[]> {
    const dateStart = new Date(new Date().getFullYear(), month - 1, 1); //这个月的第一天
    const dateEnd = new Date(new Date().getFullYear(), month, 0); //是0而不是-1
    return this.signRepository.find({
      select: ['createdAt', 'favs'],
      where: {
        userId: user.id,
        createdAt: Between(
          dayjs(dateStart).format('YYYY-MM-DD') as unknown as Date,
          dayjs(dateEnd).format('YYYY-MM-DD') as unknown as Date,
        ),
      },
      order: {
        createdAt: 'ASC',
      },
    });
  }

  // 查询用户总签到次数
  async getSignTotalCount(user: User) {
    return this.signRepository.count({
      where: {
        userId: user.id,
      },
    });
  }

  // 查询用户连续签到天数
  async getSignContinuousCount(user: User) {
    // 昨天没有签到今天签到了 也需要展示连续签到天数
    // 今天没有签到获取昨天是否签到 有直接展示连续签到天数
    const result = await this.signRepository.findOne({
      where: [
        {
          userId: user.id,
          createdAt: dayjs()
            .subtract(1, 'days')
            .format('YYYY-MM-DD') as unknown as Date,
        },
        {
          userId: user.id,
          createdAt: dayjs().format('YYYY-MM-DD') as unknown as Date,
        },
      ],
    });
    return result ? user.signInCount : 0;
  }

  // 最新签到列表
  async findNewList() {
    const list = await this.signRepository.find({
      select: ['userId'],
      take: 20,
      order: {
        id: 'DESC',
      },
    });

    return await Promise.all(
      list.map(
        async (item) => await this.userService.findOne(item.userId, select),
      ),
    );
  }

  // 今日最快签到列表
  async findTodayList() {
    const list = await this.signRepository.find({
      select: ['userId'],
      take: 20,
      where: {
        createdAt: dayjs().format('YYYY-MM-DD') as unknown as Date,
      },
      order: {
        id: 'ASC',
      },
    });
    return await Promise.all(
      list.map(
        async (item) => await this.userService.findOne(item.userId, select),
      ),
    );
  }

  // 总榜签到列表
  async findRankList() {
    const list = await this.signRepository
      .createQueryBuilder('sign')
      .select('Count(*)', 'count')
      .addSelect('sign.userId', 'userId')
      .groupBy('userId')
      .orderBy('count', 'DESC')
      .take(20)
      .getRawMany();

    return await Promise.all(
      list.map(async (item) => ({
        ...(await this.userService.findOne(item.userId, select)),
        count: item.count,
      })),
    );
  }
}
