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
import { Article } from '@libs/db/entity/article.entity';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { ArticleCollect } from '@libs/db/entity/articleCollect.entity';
import { ArticleLike } from '@libs/db/entity/articleLike.entity';
import { Follow } from '@libs/db/entity/follow.entity';
import { FollowService } from '../follow/follow.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(ArticleCollect)
    private readonly collectRepository: Repository<ArticleCollect>,
    @InjectRepository(ArticleLike)
    private readonly likeRepository: Repository<ArticleLike>,
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

  // 根据用户id获取用户文章列表
  async getArticle(id: number): Promise<Article[]> {
    return await this.articleRepository.find({
      relations: ['tag', 'author', 'category'],
      where: { author: { id } },
      order: {
        isTop: 'DESC',
        id: 'DESC',
      },
    });
  }

  async getCollect(id: number): Promise<ArticleCollect[]> {
    return await this.collectRepository.find({
      relations: ['article', 'article.author'],
      where: { user: { id } },
      order: {
        id: 'DESC',
      },
    });
  }

  async getLike(id: number): Promise<ArticleLike[]> {
    return await this.likeRepository.find({
      relations: ['article', 'article.author', 'article.category'],
      where: { user: { id } },
      order: {
        id: 'DESC',
      },
    });
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

    const [otherFollowInfo, meFollowInfo] = await Promise.all([
      this.getUserInfoList(otherFollow),
      this.getUserInfoList(meFollow),
    ]);

    const meFollowId = meFollowInfo.map((item) => item.id);

    const followList = otherFollowInfo.map((item) => ({
      id: item.id,
      nickName: item.nickName,
      avatar: item.avatar,
      isFollow: meFollowId.includes(item.id),
    }));

    return followList;
  }

  // 根据用户id获取用户信息
  async findOne(id: number, user?: User): Promise<User> {
    // return await this.userRepository.findOneOrFail({
    //   select: ['nickName', 'account', 'avatar', 'sign', 'createdAt'],
    //   where: { id },
    // });
    const userInfo = this.userRepository
      .createQueryBuilder('user')
      .select([
        'user.nickName',
        'user.account',
        'user.avatar',
        'user.sign',
        'user.createdAt',
      ])
      // .loadRelationCountAndMap(
      //   'user.followCount',
      //   'user.follow',
      //   'follow',
      //   (qb) => qb.andWhere('follow.user = :user', { user: { id } }),
      // )
      .where('user.id = :id', { id })
      .getOne();
    return userInfo;
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
}
