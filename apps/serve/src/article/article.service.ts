import { Article } from '@libs/db/entity/article.entity';
import { ArticleLike } from '@libs/db/entity/articleLike.entity';
import { Category } from '@libs/db/entity/category.entity';
import { Tag } from '@libs/db/entity/tag.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageResult } from 'apps/shared/dto/page.dto';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { In, IsNull, Like, Not, Repository } from 'typeorm';
import {
  ArticleDto,
  CreateArticleLikeDto,
  FindArticleDto,
  SearchArticleDto,
} from './dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(ArticleLike)
    private readonly articleLikeRepository: Repository<ArticleLike>,
  ) {}

  // 创建新文章
  async create(params: ArticleDto, user: User) {
    const { title, content, image, tag, categoryId } = params;
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    // save 存在即更新不存在则插入
    const tagData = await this.tagRepository.save(tag);
    await this.articleRepository.save({
      title,
      content,
      image,
      category,
      author: user,
      tag: tagData,
    });
  }

  async findAll(
    params: FindArticleDto,
    user: User,
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
      .select([
        'article',
        'author.id',
        'author.nickName',
        'author.avatar',
        'tag.id',
        'tag.name',
        'category.id',
        'category.title',
      ])
      .loadRelationCountAndMap('article.isLike', 'article.like', 'like', (qb) =>
        qb.andWhere('like.user = :user', { user: user.id }),
      )
      .orderBy('article.id', 'DESC')
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    return { list, total };
  }

  async findSearch(
    { page = 1, limit = 10, title = '' }: SearchArticleDto,
    user: User,
  ): Promise<PageResult<Article>> {
    const [list, total] = await this.articleRepository.findAndCount({
      relations: ['author', 'tag'],
      where: { title: Like(`%${title}%`) },
      skip: limit * (page - 1),
      take: limit,
      order: { id: 'DESC' },
    });
    return { list, total };
  }

  findHotList() {
    return this.articleRepository.find({
      select: ['id', 'title', 'reading'],
      take: 6,
      order: { reading: 'DESC' },
    });
  }

  // 根据分类Id 查询热门文章
  async findHot(id: number, user: User): Promise<Article[]> {
    const { chidlId } = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.children', 'children')
      // .select("GROUP_CONCAT(category.id)", "id")
      .select('GROUP_CONCAT(children.id)', 'chidlId')
      .where('category.id = :id', { id })
      .getRawOne();
    const ids: number[] = chidlId.split(',');

    const sql = this.articleRepository.createQueryBuilder('article');
    id !== 23
      ? sql.orderBy('article.likes', 'DESC')
      : sql.orderBy('article.comments', 'DESC');

    return await sql
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tag', 'tag')
      .select('article')
      .addSelect('author.nickName')
      .addSelect('category.id')
      .addSelect('category.title')
      .where({ category: In(ids) })
      .loadRelationCountAndMap(
        'article.likeCount',
        'article.like',
        'like',
        (qb) => qb.andWhere('like.user = :user', { user: user.id }),
      )
      .where({ title: Not('') })
      .take(3)
      .getMany();
  }

  // 查询文章详情
  async findOne(id: number, user: User) {
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.author', 'author')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tag', 'tag')
      .select([
        'article',
        'author.id',
        'author.nickName',
        'author.avatar',
        'category.id',
        'category.title',
        'tag.id',
        'tag.name',
      ])
      .loadRelationCountAndMap('article.isLike', 'article.like', 'like', (qb) =>
        qb.andWhere('like.user = :user', { user: user.id }),
      )
      .where('article.id = :id', { id })
      .getOne();
    if (!article) throw new ApiException(10400, '文章不存在');
    this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set({
        reading: () => 'reading + 1',
      })
      .where('id = :id', { id })
      .execute();
    return article;
  }

  // 添加文章点赞
  async like(dto: CreateArticleLikeDto, user: User) {
    const { articleId } = dto;
    const article = await this.articleRepository.findOneByOrFail({
      id: articleId,
    });
    await this.articleLikeRepository.insert({ user, article });

    await this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set({
        likeCount: () => 'like_count + 1',
      })
      .where('id = :id', { id: articleId })
      .execute();
  }

  // 文章取消点赞
  async likeDel(id: number, user: User) {
    const like = await this.articleLikeRepository.findOneByOrFail({
      article: { id },
      user: { id: user.id },
    });
    await this.articleLikeRepository.remove(like);
    await this.articleLikeRepository
      .createQueryBuilder()
      .update(Article)
      .set({
        likeCount: () => 'like_count - 1',
      })
      .where('id = :id', { id })
      .execute();
  }
}
