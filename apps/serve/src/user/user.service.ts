import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import {
  CreateUserDto,
  RegisterCode,
  UpdateUserDto,
  UserFollowDto,
} from './dto';
import { User } from '@libs/db/entity/user.entity';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { EmailService } from '@libs/email';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { FollowService } from '../follow/follow.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly followService: FollowService,
  ) {}

  async create(data: CreateUserDto) {
    const { email, password } = data;
    // 检查用户名是否存在
    const existing = await this.userRepository.findOneBy({ email });
    if (existing) throw new ApiException(10400, '该用户已注册');
    // const value = await this.cacheManager.get(email);
    // if (code !== value) throw new ApiException(10400, '验证码错误');
    await this.userRepository.insert({ email, password });
  }

  // 我关注的用户
  async getFollow(
    id: number,
    type: number,
    user: User,
  ): Promise<UserFollowDto[]> {
    const wherekey = type === 1 ? 'userId' : 'followId';
    const selectKey = type === 2 ? 'userId' : 'followId';

    // let uesrList: Partial<User>[] = [];
    // 传入用户关注列表
    // 当前登录用户关注列表
    const [otherFollow, meFollow] = await Promise.all([
      this.followService.getFollowList(id, wherekey, selectKey),
      this.followService.getFollowList(user.id, 'userId', 'followId'),
    ]);

    const otherFollowInfo = await this.getUserInfoList(otherFollow);

    const followList = otherFollowInfo.map((item) => ({
      id: item.id,
      nickName: item.nickName,
      avatar: item.avatar,
      isFollow: meFollow.includes(item.id),
    }));
    return followList;
  }
  // 根据id获取用户信息
  async getUserInfo(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      select: ['id', 'nickName', 'avatar'],
      where: { id: userId },
    });
  }

  // 根据用户id获取用户信息
  async findOne(
    id: number,
    select: string[] = [
      'user.nickName',
      'user.account',
      'user.avatar',
      'user.signText',
      'user.createdAt',
      'user.likeTotal',
      'user.readTotal',
    ],
  ): Promise<User> {
    return this.userRepository
      .createQueryBuilder('user')
      .select(select)
      .where('user.id = :id', { id })
      .getOne();

    // .loadRelationCountAndMap(
    //   'user.likeNum',
    //   'user.articleLike',
    //   'like',
    //   (qb) => qb.andWhere('like.user = :user', { user: id }),
    // )
    // .loadRelationCountAndMap(
    //   'user.collectNum',
    //   'user.collect',
    //   'collect',
    //   (qb) => qb.andWhere('collect.user = :user', { user: id }),
    // )
  }

  // async registerCode({ email }: RegisterCode) {
  //   await this.emailService.sendEmail(email, '倾说：邮箱注册验证码', 'code');
  // }

  // 修改用户信息
  async update(id: number, dto: UpdateUserDto) {
    const { avatar, age, position, location, sex, nickName } = dto;
    await this.userRepository.update(id, {
      avatar,
      age,
      position,
      location,
      sex,
      nickName,
    });
  }

  // 获取用户列表信息
  async getUserInfoList(idList: number[]) {
    return await this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.nickName', 'user.avatar'])
      .orderBy('user.id', 'DESC')
      .whereInIds(idList)
      .getMany();
  }

  // 增加用户总阅读量
  addUserRead(userId: number) {
    this.userRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .update()
      .set({
        readTotal: () => 'read_total + 1',
      })
      .where('id = :id', { id: userId })
      .execute();
  }

  // 增加或减少文章点赞量
  likeOpertion(id: number, type: 'add' | 'reduce') {
    const sql = type === 'add' ? 'like_total + 1' : 'like_total - 1';
    this.userRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .update()
      .set({
        likeTotal: () => sql,
      })
      .where('id = :id', { id })
      .execute();
  }
}
