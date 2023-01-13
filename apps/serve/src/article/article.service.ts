import { Article } from '@libs/db/entity/article.entity';
import { ArticleCollect } from '@libs/db/entity/articleCollect.entity';
import { Category } from '@libs/db/entity/category.entity';
import { Tag } from '@libs/db/entity/tag.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageResult } from 'apps/shared/dto/page.dto';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { In, IsNull, Like, Not, Repository } from 'typeorm';
import { DynamicService } from '../dynamic/dynamic.service';
import { UserService } from '../user/user.service';
import {
  ArticleDto,
  FindArticleDto,
  FindUserArticleDto,
  SearchArticleDto,
} from './dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
    private readonly userService: UserService,
    private readonly dynamicService: DynamicService,
  ) {}

  // 创建新文章
  async create(params: ArticleDto, user: User) {
    const { title, content, image, tag, categoryId, coverPicture, type } =
      params;
    const category = await this.categoryRepository.findOneBy({
      id: categoryId,
    });
    // save 存在即更新不存在则插入
    const tagData = await this.tagRepository.save(tag);
    const result = await this.articleRepository.save({
      title,
      content,
      image,
      category,
      userId: user.id,
      tag: tagData,
      coverPicture,
      type,
      summary: this.getSimpleText(content),
    });
    // 记录动态
    this.dynamicService.create({
      type: 1,
      userId: user.id,
      articleId: result.id,
    });
  }

  async findAll(
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
      .leftJoinAndSelect('article.tag', 'tag')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndMapOne(
        'article.author',
        User,
        'author',
        'author.id=article.userId',
      )
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

  async findHotList(limit = 6) {
    const list = await this.articleRepository.find({
      select: {
        id: true,
        title: true,
        reading: true,
        coverPicture: true,
        createdAt: true,
        userId: true,
      },
      take: limit,
      order: { reading: 'DESC' },
    });
    return await Promise.all(
      list.map(async ({ userId, ...rest }) => ({
        ...rest,
        author: await this.userService.getUserInfo(userId),
      })),
    );
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
  async findOne(id: number) {
    const article = await this.articleRepository
      .createQueryBuilder('article')
      .leftJoinAndSelect('article.category', 'category')
      .leftJoinAndSelect('article.tag', 'tag')
      .select([
        'article',
        'category.id',
        'category.title',
        'tag.id',
        'tag.name',
      ])
      .where('article.id = :id', { id })
      .getOne();
    if (!article) throw new ApiException(10400, '文章不存在');
    const author = await this.userService.getUserInfo(article.userId);
    this.readOpertion(id);
    // 增加用户总阅读量
    this.userService.addUserRead(article.userId);
    return { ...article, author };
  }

  // 根据id 获取文章列表 收藏 点赞列表
  async getCollectLikeList(list: ArticleCollect[]) {
    const ids = list?.map((item) => item.articleId) || [];
    const artileList = await this.articleRepository.find({
      select: {
        id: true,
        title: true,
        summary: true,
        coverPicture: true,
        createdAt: true,
        reading: true,
        likeCount: true,
        commentCount: true,
        userId: true,
        category: {
          id: true,
          title: true,
        },
      },
      relations: {
        category: true,
      },
      where: {
        id: In(ids),
      },
    });
    if (artileList.length === 0) return [];
    return await Promise.all(
      artileList.map(async ({ userId, ...rest }) => ({
        ...rest,
        author: await this.userService.getUserInfo(userId),
      })),
    );
  }

  // 增加文章阅读量
  readOpertion(id: number) {
    this.articleRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .update()
      .set({
        reading: () => 'reading + 1',
      })
      .where('id = :id', { id })
      .execute();
  }

  // 增加或减少文章点赞量
  likeOpertion(id: number, type: 'add' | 'reduce') {
    const sql = type === 'add' ? 'like_count + 1' : 'like_count - 1';
    this.articleRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .update()
      .set({
        likeCount: () => sql,
      })
      .where('id = :id', { id })
      .execute();
  }

  // 增加文章评论量
  async commentOpertion(id: number) {
    await this.articleRepository
      .createQueryBuilder()
      .setLock('pessimistic_write')
      .update()
      .set({
        commentCount: () => 'comment_count + 1',
      })
      .where('id = :id', { id })
      .execute();
  }

  // 根据用户id获取用户文章列表
  async getUserArticle(
    userId: number,
    params: FindUserArticleDto,
  ): Promise<{ list: any[]; total: number }> {
    const { limit = 10, page = 1 } = params;
    const [articleList, total] = await this.articleRepository.findAndCount({
      select: {
        id: true,
        title: true,
        reading: true,
        coverPicture: true,
        createdAt: true,
        userId: true,
        summary: true,
        category: {
          id: true,
          title: true,
        },
        tag: {
          id: true,
          name: true,
        },
        commentCount: true,
        likeCount: true,
      },
      relations: {
        category: true,
        tag: true,
      },
      skip: limit * (page - 1),
      take: limit,
      where: { userId },
      order: { id: 'DESC' },
    });
    const list = await Promise.all(
      articleList.map(async ({ userId, ...rest }) => ({
        ...rest,
        author: await this.userService.getUserInfo(userId),
      })),
    );

    return { list, total };
  }

  getSimpleText(html: string) {
    const re1 = new RegExp('<.+?>', 'g'); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
    const msg = html.replace(re1, ''); //执行替换成空字符
    return msg.substring(0, 30);
  }
}
