import { Article } from '@libs/db/entity/article.entity';
import { Category } from '@libs/db/entity/category.entity';
import { Tag } from '@libs/db/entity/tag.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageResult } from 'apps/shared/dto/page.dto';
import { In, Like, Not, Repository } from 'typeorm';
import { CreateArticleDto, FindArticleDto } from './interface';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 创建新文章
  async create(params: CreateArticleDto) {
    const { title, content, image, tag, categoryId, status } = params;
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });

    const randId = Math.floor(Math.random() * 10) + 1;
    const author = await this.userRepository.findOneBy({ id: randId });
    // save 存在即更新不存在则插入
    const tagData = await this.tagRepository.find({ where: { id: In(tag) } });
    await this.articleRepository.save({
      title,
      content,
      image,
      category,
      author,
      status,
      tag: tagData,
    });
  }

  async update(id: number, params: CreateArticleDto) {
    const { title, content, image, tag, categoryId, status } = params;
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    // save 存在即更新不存在则插入
    const tagData = await this.tagRepository.find({ where: { id: In(tag) } });
    await this.articleRepository.save({
      id,
      title,
      content,
      image,
      category,
      status,
      tag: tagData,
    });
  }

  async find(
    params: FindArticleDto,
  ): Promise<{ list: Article[]; total: number }> {
    const { categoryId, page = 1, limit = 10 } = params;
    let ids: number[] = [];

    if (categoryId) {
      const { id } = await this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.children', 'children')
        .select('GROUP_CONCAT(category.id)', 'id')
        .select('GROUP_CONCAT(children.id)', 'id')
        .where('category.id = :id', { id: categoryId })
        .getRawOne();
      ids = id.split(',');
    }
    const qb = this.articleRepository.createQueryBuilder('article');
    ids.length === 0 ? qb : qb.where({ category: In(ids) });

    const [list, total] = await qb
      .leftJoinAndSelect('article.author', 'author') // 控制返回参数
      .leftJoinAndSelect('article.tag', 'tag')
      .leftJoinAndSelect('article.category', 'category')
      .select('article')
      .addSelect('author.id')
      .addSelect('author.nickName')
      .addSelect('author.avatar')
      .addSelect('tag.id')
      .addSelect('tag.name')
      .addSelect('category.id')
      .addSelect('category.title')
      .orderBy('article.id', 'DESC')
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    return { list, total };
  }

  // 查询文章详情
  async findOne(id: number) {
    return await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tag', 'tag')
      .select('article')
      .addSelect('author.id')
      .addSelect('author.nickName')
      .addSelect('author.avatar')
      .addSelect('category.id')
      .addSelect('category.title')
      .addSelect('tag.id')
      .addSelect('tag.name')
      .where('article.id = :id', { id })
      .getOne();
  }
}
