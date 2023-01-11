import { Article } from '@libs/db/entity/article.entity';
import { Dynamic } from '@libs/db/entity/dynamic.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';
import { Repository } from 'typeorm';
import { DynamiceDto } from './dto';

@Injectable()
export class DynamicService {
  constructor(
    @InjectRepository(Dynamic)
    private readonly dynamicRepository: Repository<Dynamic>,
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
      .select(['dynamic.id', 'dynamic.type', 'dynamic.createdAt'])
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

    // return await Promise.all(
    //   list.map(async (item) => {
    //     if (item.type === 1 || item.type === 2) {
    //       return {
    //         ...item,
    //         isLike: await this.likeService.isMyLike(userId, item.article.id),
    //       };
    //     } else {
    //       return item;
    //     }
    //   }),
    // );

    return { list, total };
  }

  // 添加用户动态
  async create(dto: DynamiceDto) {
    this.dynamicRepository.insert(dto);
  }

  async delete(userId: number, articleId: number, followId: number) {}
}
