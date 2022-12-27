import { Article } from '@libs/db/entity/article.entity';
import { ArticleLike } from '@libs/db/entity/articleLike.entity';
import { User } from '@libs/db/entity/user.entity';
import { UserReadLike } from '@libs/db/entity/userReadLike.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LikeDto } from './dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(ArticleLike)
    private readonly likeRepository: Repository<ArticleLike>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(UserReadLike)
    private readonly userReadLikeRepository: Repository<UserReadLike>,
  ) {}

  async add(dto: LikeDto, user: User) {
    const { articleId } = dto;

    const article = await this.articleRepository.findOne({
      select: {
        author: {
          id: true,
        },
      },
      relations: {
        author: true,
      },
      where: {
        id: articleId,
      },
    });

    await this.likeRepository.insert({
      userId: user.id,
      articleId,
    });

    this.articleRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .update()
      .set({
        likeCount: () => 'like_count + 1',
      })
      .where('id = :id', { id: articleId })
      .execute();

    // 点赞增加用户点赞总次数
    const userReadLikeRecord = await this.userReadLikeRepository.findOneBy({
      userId: article.author.id,
    });

    if (userReadLikeRecord) {
      this.userReadLikeRepository
        .createQueryBuilder()
        .setLock('pessimistic_write')
        .update()
        .set({
          likeTotal: () => 'like_total + 1',
        })
        .where('userId = :userId', { userId: article.author.id })
        .execute();
    } else {
      this.userReadLikeRepository.save({
        userId: article.author.id,
        likeCount: 1,
      });
    }
  }

  // 文章取消点赞
  async del(id: number, user: User) {
    const like = await this.likeRepository.findOneByOrFail({
      articleId: id,
      userId: user.id,
    });
    await this.likeRepository.remove(like);

    this.articleRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .update()
      .set({
        likeCount: () => 'like_count - 1',
      })
      .where('id = :id', { id })
      .execute();

    const article = await this.articleRepository.findOne({
      select: {
        author: {
          id: true,
        },
      },
      relations: {
        author: true,
      },
      where: {
        id,
      },
    });

    this.userReadLikeRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .update()
      .set({
        likeTotal: () => 'like_total - 1',
      })
      .where('userId = :userId', { userId: article.author.id })
      .execute();
  }

  // 查看我是否点赞该文章
  async isMyLike(userId: number, articleId: number): Promise<boolean> {
    const num = await this.likeRepository.count({
      where: {
        userId,
        articleId,
      },
    });
    return !!num;
  }

  async isMyLikeList(userId: number, list: Article[]) {
    return await Promise.all(
      list.map(async (item) => ({
        ...item,
        isLike: await this.isMyLike(userId, item.id),
      })),
    );
  }

  // 获取用户点赞列表
  async findLikeList(userId: number): Promise<ArticleLike[]> {
    return await this.likeRepository.find({
      select: ['articleId'],
      where: { userId },
    });
  }
}
