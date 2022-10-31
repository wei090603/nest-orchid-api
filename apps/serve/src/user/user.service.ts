import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto, RegisterCode, UpdateUserDto } from './dto';
import { User } from '@libs/db/entity/user.entity';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { EmailService } from '@libs/email';
import { Article } from '@libs/db/entity/article.entity';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { ArticleCollect } from '@libs/db/entity/articleCollect.entity';
import { ArticleLike } from '@libs/db/entity/articleLike.entity';
import { Follow } from '@libs/db/entity/follow.entity';

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
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
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
  async getFollow(id: number, type: number): Promise<User[]> {
    const wherekey = type === 1 ? 'userId' : 'followId';
    const selectKey = type === 2 ? 'userId' : 'followId';

    // let uesrList: Partial<User>[] = [];
    const list = await this.followRepository.find({
      select: [selectKey],
      where: {
        [wherekey]: id,
      },
    });
    if (list.length === 0) return [];
    const ids = list.map((item) => item[selectKey]);
    return await this.userRepository.find({
      select: ['id', 'nickName', 'avatar'],
      where: {
        id: In(ids),
      },
    });
  }

  // 根据用户id获取用户信息
  async findOne(id: number, user: User): Promise<User> {
    // return await this.userRepository.findOneOrFail({
    //   select: ['nickName', 'account', 'avatar', 'sign', 'createdAt'],
    //   where: { id },
    // });

    const userInfo = await this.userRepository
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
}
