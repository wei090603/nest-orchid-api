import { Article } from '@libs/db/entity/article.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '@libs/db/entity/comment.entity';
import { CreateCommenSubtDto, CreateCommentDto } from './dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // 添加评论
  async create(params: CreateCommentDto, user: User) {
    const { articleId, content } = params;
    const article = await this.articleRepository.findOneBy({ id: articleId });
    await this.commentRepository.insert({
      article,
      user,
      content,
    });
    await this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set({
        comments: () => 'comments + 1',
      })
      .where('id = :id', { id: articleId })
      .execute();
  }

  // 添加子级评论
  async createSub(params: CreateCommenSubtDto, user: User) {
    const { parentId, replyId, content } = params;
    // const parent = await this.commentRepository.findOneBy({
    //   id: parentId,
    // });
    await this.commentRepository.insert({
      parent: { id: parentId },
      content,
      user,
      reply: { id: replyId },
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
      .orderBy('children.id', 'DESC')
      .orderBy('comment.id', 'ASC')
      .getManyAndCount();

    return { list, total };
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
