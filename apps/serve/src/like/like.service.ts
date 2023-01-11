import { Article } from '@libs/db/entity/article.entity';
import { ArticleLike } from '@libs/db/entity/articleLike.entity';
import { Dynamic } from '@libs/db/entity/dynamic.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleService } from '../article/article.service';
import { DynamicService } from '../dynamic/dynamic.service';
import { MessageService } from '../message/message.service';
import { UserService } from '../user/user.service';
import { LikeDto } from './dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(ArticleLike)
    private readonly likeRepository: Repository<ArticleLike>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly articleService: ArticleService,
    private readonly userService: UserService,
    private readonly messageService: MessageService,
    private readonly dynamicService: DynamicService,
  ) {}

  async add(dto: LikeDto, user: User) {
    const { articleId } = dto;

    const article = await this.articleRepository.findOne({
      select: ['userId'],
      where: {
        id: articleId,
      },
    });

    await this.likeRepository.insert({
      userId: user.id,
      articleId,
    });
    if (user.id !== article.userId) {
      await this.messageService.createLike(user.id, article.userId, articleId);
    }
    // 记录动态
    this.dynamicService.create({ type: 2, userId: user.id, articleId });
    this.articleService.likeOpertion(articleId, 'add');
    this.userService.likeOpertion(article.userId, 'add');
  }

  // 文章取消点赞
  async del(id: number, user: User) {
    const like = await this.likeRepository.findOneByOrFail({
      articleId: id,
      userId: user.id,
    });
    await this.likeRepository.remove(like);

    this.articleService.likeOpertion(id, 'reduce');

    const article = await this.articleRepository.findOne({
      select: ['userId'],
      where: {
        id,
      },
    });
    this.userService.likeOpertion(article.userId, 'reduce');
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

  // 查询列表是否点赞
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

  // 获取用户点赞总数
  async findLikeCount(userId: number) {
    return await this.likeRepository.count({
      where: {
        userId,
      },
    });
  }

  // 动态点赞文章
  async isMyDynamicLikeList(userId: number, list: any[]) {}
}
