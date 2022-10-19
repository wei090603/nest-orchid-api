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
    await this.collectRepository.insert({ user, article: existing });
  }

  async delArticle(id: number, user: User) {
    const collect = await this.collectRepository.findOneByOrFail({
      article: { id },
      user: { id: user.id },
    });
    await this.collectRepository.remove(collect);
  }
}
