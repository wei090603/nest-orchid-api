import { Article } from '@libs/db/entity/article.entity';
import { ArticleCollect } from '@libs/db/entity/articleCollect.entity';
import { ArticleLike } from '@libs/db/entity/articleLike.entity';
import { Dynamic } from '@libs/db/entity/dynamic.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';
import { In, Repository } from 'typeorm';
import { DynamiceDto } from './dto';

@Injectable()
export class DynamicService {
  constructor(
    @InjectRepository(Dynamic)
    private readonly dynamicRepository: Repository<Dynamic>,
    @InjectRepository(ArticleLike)
    private readonly likeRepository: Repository<ArticleLike>,
    @InjectRepository(ArticleCollect)
    private readonly collectRepository: Repository<ArticleCollect>,
  ) {}

  async getDynamicList(userId: number, params: PageOptionsDto) {
    const { page = 1, limit = 10 } = params;

    const [list, total] = await this.dynamicRepository
      .createQueryBuilder('dynamic')
      .leftJoinAndMapOne(
        'dynamic.user',
        User,
        'user',
        'user.id = dynamic.userId',
      )
      .leftJoinAndMapOne(
        'dynamic.follow',
        User,
        'follow',
        'follow.id = dynamic.followId',
      )
      .leftJoinAndMapOne(
        'dynamic.article',
        Article,
        'article',
        'article.id = dynamic.articleId',
      )
      .leftJoinAndMapOne(
        'article.author',
        User,
        'author',
        'author.id = article.userId',
      )
      .select([
        'dynamic.id',
        'dynamic.type',
        'dynamic.createdAt',
        'dynamic.articleId',
      ])
      .addSelect(['user.id', 'user.nickName', 'user.avatar', 'user.signText'])
      .addSelect([
        'article.id',
        'article.title',
        'article.summary',
        'article.likeCount',
        'article.commentCount',
      ])
      .addSelect(['follow.id', 'follow.nickName', 'follow.avatar'])
      .addSelect([
        'author.id',
        'author.nickName',
        'author.avatar',
        'author.signText',
      ])
      .where('dynamic.userId = :userId', { userId })
      .orderBy('dynamic.id', 'DESC')
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    const ids: number[] = list
      .filter((item) => item.type === 1 || item.type === 2)
      .map((item) => item.articleId);

    const [like, collect] = await Promise.all([
      await this.likeRepository.find({
        where: {
          articleId: In(ids),
          userId: In([userId]),
        },
      }),
      this.collectRepository.find({
        where: {
          articleId: In(ids),
          userId: In([userId]),
        },
      }),
    ]);

    const lists = list.map((item) => {
      if (item.type === 1 || item.type === 2) {
        item.article.isLike = like.some((p) => p.articleId === item.articleId);
        item.article.isCollect = collect.some((p) => p.articleId === item.articleId);
      }
      return item;
    });

    return { list: lists, total };
  }

  // 添加用户动态
  async create(dto: DynamiceDto) {
    this.dynamicRepository.insert(dto);
  }

  async delete(userId: number, articleId: number, followId: number) {}
}
