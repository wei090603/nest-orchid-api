import { Article } from '@libs/db/entity/article.entity';
import { Dynamic } from '@libs/db/entity/dynamic.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from 'apps/shared/dto/page.dto';
import { Repository } from 'typeorm';

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
        // leftJoinAndMapOne(
        //   'article.user',
        //   User,
        //   'user',
        //   'user.id = article.userId',
        // ),
      )
      .select([
        'dynamic.id',
        'dynamic.type',
        'dynamic.createdAt',
        'user.id',
        'user.nickName',
        'user.avatar',
        'user.signText',
        'follow.id',
        'follow.nickName',
        'follow.avatar',
        'article.id',
        'article.title',
        'article.summary',
        'article.likeCount',
        'article.commentCount',
      ])
      .where('dynamic.userId = :userId', { userId })
      .orderBy('dynamic.id', 'DESC')
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    return { list, total };
  }
}
