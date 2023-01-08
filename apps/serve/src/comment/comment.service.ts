import { Article } from '@libs/db/entity/article.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
import { Comment } from '@libs/db/entity/comment.entity';
import { CreateCommenSubtDto, CreateCommentDto } from './dto';
import { MessageService } from '../message/message.service';
import { ArticleService } from '../article/article.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly messageService: MessageService,
    private readonly articleService: ArticleService,
  ) {}

  // 添加评论
  async create(params: CreateCommentDto, user: User) {
    const { articleId, content } = params;
    const article = await this.articleRepository.findOneBy({ id: articleId });
    await this.commentRepository.insert({
      article: { id: articleId },
      user,
      content,
    });
    this.articleService.commentOpertion(articleId);
    // this.messageService.createComment({articleId, })
  }

  // 添加子级评论
  async createSub(params: CreateCommenSubtDto, user: User) {
    const { parentId, content, articleId, replyId } = params;
    await this.commentRepository.insert({
      parent: { id: parentId },
      content,
      user,
      reply: { id: replyId },
      article: { id: articleId },
    });
  }

  // 根据文章id 获取评论列表
  async findComment(id: number) {
    const [list, total] = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.children', 'children')
      .leftJoinAndSelect('children.user', 'childUser')
      .leftJoinAndSelect('children.reply', 'reply')
      .select([
        'comment',
        'user.id',
        'user.avatar',
        'user.nickName',
        'children',
        'childUser.id',
        'childUser.avatar',
        'childUser.nickName',
        'reply.id',
        'reply.avatar',
        'reply.nickName',
      ])
      .where('comment.article = :article', { article: id })
      // .andWhere('comment.parent = :parent', { parent: IsNull() }) // querybuilder 方式不支持IsNull()方式
      .andWhere('comment.parent is null')
      .orderBy('children.id', 'DESC')
      .orderBy('comment.id', 'ASC')
      .getManyAndCount();

    return { list, total };
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
