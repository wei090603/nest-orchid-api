import { Article } from '@libs/db/entity/article.entity';
import { ArticleCollect } from '@libs/db/entity/articleCollect.entity';
import { Category } from '@libs/db/entity/category.entity';
import { Tag } from '@libs/db/entity/tag.entity';
import { User } from '@libs/db/entity/user.entity';
import { UserReadLike } from '@libs/db/entity/userReadLike.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageResult } from 'apps/shared/dto/page.dto';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { In, IsNull, Like, Not, Repository } from 'typeorm';
import { ArticleDto, FindArticleDto, SearchArticleDto } from './dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
    @InjectRepository(UserReadLike)
    private readonly userReadLikeRepository: Repository<UserReadLike>,
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
    await this.articleRepository.save({
      title,
      content,
      image,
      category,
      author: user,
      tag: tagData,
      coverPicture,
      type,
      summary: this.getSimpleText(content),
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
  async findOne(id: number) {
    console.log(id, 'id');
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
      // .loadRelationCountAndMap('article.isLike', 'article.like', 'like', (qb) =>
      //   qb.andWhere('like.user = :user', { user: user.id }),
      // )
      // .loadRelationCountAndMap(
      //   'article.isCollect',
      //   'article.collect',
      //   'collect',
      //   (qb) => qb.andWhere('collect.user = :user', { user: user.id }),
      // )
      .where('article.id = :id', { id })
      .getOne();
    if (!article) throw new ApiException(10400, '文章不存在');

    this.articleRepository
      .createQueryBuilder()
      .update()
      .set({
        reading: () => 'reading + 1',
      })
      .where('id = :id', { id })
      .execute();

    const userReadLikeRecord = await this.userReadLikeRepository.findOneBy({
      userId: article.author.id,
    });

    if (userReadLikeRecord) {
      this.userReadLikeRepository
        .createQueryBuilder()
        .update()
        .set({
          readTotal: () => 'read_total + 1',
        })
        .where('userId = :userId', { userId: article.author.id })
        .execute();
    } else {
      this.userReadLikeRepository.save({
        userId: article.author.id,
        readCount: 1,
      });
    }

    return article;
  }

  // 根据id 获取文章列表 收藏 点赞列表
  async getCollectLikeList(list: ArticleCollect[]) {
    const ids = list?.map((item) => item.articleId) || [];
    return await this.articleRepository.find({
      select: {
        id: true,
        title: true,
        summary: true,
        coverPicture: true,
        createdAt: true,
        reading: true,
        likeCount: true,
        commentCount: true,
        author: {
          id: true,
          nickName: true,
        },
        category: {
          id: true,
          title: true,
        },
      },
      relations: {
        author: true,
        category: true,
      },
      where: {
        id: In(ids),
      },
    });
  }

  getSimpleText(html: string) {
    const re1 = new RegExp('<.+?>', 'g'); //匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
    const msg = html.replace(re1, ''); //执行替换成空字符
    return msg.substring(0, 30);
  }
}
