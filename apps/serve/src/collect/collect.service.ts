import { Article } from '@libs/db/entity/article.entity';
import { ArticleCollect } from '@libs/db/entity/articleCollect.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { Repository } from 'typeorm';
import { CollectDto } from './dto';

@Injectable()
export class CollectService {
  constructor(
    @InjectRepository(ArticleCollect)
    private readonly collectRepository: Repository<ArticleCollect>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async addArticle(dto: CollectDto, user: User) {
    const { articleId } = dto;
    const existing = await this.articleRepository.findOneBy({ id: articleId });
    if (!existing) throw new ApiException(10404, '文章不存在');
    await this.collectRepository.insert({
      userId: user.id,
      articleId,
    });
  }

  async delArticle(id: number, user: User) {
    const collect = await this.collectRepository.findOneByOrFail({
      userId: user.id,
      articleId: id,
    });
    await this.collectRepository.remove(collect);
  }

  // 查看我是否收藏该文章
  async isMyCollect(userId: number, articleId: number): Promise<boolean> {
    const num = await this.collectRepository.count({
      where: {
        userId,
        articleId,
      },
    });
    return !!num;
  }

  // 获取用户收藏列表
  async findCollectList(id: number): Promise<ArticleCollect[]> {
    return await this.collectRepository.find({
      select: ['articleId'],
      where: { userId: id },
    });
  }
}
