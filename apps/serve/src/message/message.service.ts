import { Article } from '@libs/db/entity/article.entity';
import { MessageLike } from '@libs/db/entity/messageLike.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// import { UserService } from '../user/user.service';
import { CommentDto, FindMsgListDto } from '../message/dto';
import { MessageFollow } from '@libs/db/entity/messageFollow.entity';
import { User } from '@libs/db/entity/user.entity';
import { MessageComment } from '@libs/db/entity/messageComment.entity';
import { MessageSystem } from '@libs/db/entity/messageSystem.entity';
import { Comment } from '@libs/db/entity/comment.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageLike)
    private readonly msgLikeRepository: Repository<MessageLike>,
    @InjectRepository(MessageFollow)
    private readonly msgFollowRepository: Repository<MessageFollow>,
    @InjectRepository(MessageComment)
    private readonly msgCommentRepository: Repository<MessageComment>,
    @InjectRepository(MessageSystem)
    private readonly msgSystemRepository: Repository<MessageSystem>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  // 获取消息列表
  async getLikeList(
    params: FindMsgListDto,
    userId: number,
  ): Promise<{ list: any[]; total: number }> {
    const { page, limit } = params;

    const [msgList, total] = await this.msgLikeRepository.findAndCount({
      select: ['id', 'userId', 'articleId', 'createdAt'],
      skip: limit * (page - 1),
      take: limit,
      where: { cId: userId },
      order: { id: 'DESC' },
    });

    const list = await Promise.all(
      msgList.map(async (item) => ({
        isRead: item.isRead,
        createdAt: item.createdAt,
        user: await this.userRepository.findOne({
          select: ['id', 'nickName', 'avatar'],
          where: { id: userId },
        }),
        article: await this.articleRepository.findOne({
          select: ['id', 'title'],
          where: { id: item.articleId },
        }),
      })),
    );

    return { list, total };
  }

  // 添加点赞消息
  async createLike(userId: number, cId: number, articleId: number) {
    await this.msgLikeRepository.insert({
      userId,
      cId,
      articleId,
    });
  }

  // 关注消息列表
  async getFollowList(
    params: FindMsgListDto,
    userId: number,
  ): Promise<{ list: any[]; total: number }> {
    const { page, limit } = params;

    const [msgList, total] = await this.msgFollowRepository.findAndCount({
      select: ['id', 'userId', 'createdAt'],
      skip: limit * (page - 1),
      take: limit,
      where: { cId: userId },
      order: { id: 'DESC' },
    });

    const list = await Promise.all(
      msgList.map(async (item) => ({
        isRead: item.isRead,
        createdAt: item.createdAt,
        user: await this.userRepository.findOne({
          select: ['id', 'nickName', 'avatar'],
          where: { id: userId },
        }),
      })),
    );

    return { list, total };
  }

  // 添加关注消息
  async createFollow(userId: number, cId: number) {
    await this.msgFollowRepository.insert({
      userId,
      cId,
    });
  }

  // 评论消息列表
  async getCommentList(
    params: FindMsgListDto,
    userId: number,
  ): Promise<{ list: any[]; total: number }> {
    const { page = 1, limit = 10 } = params;

    const [msgList, total] = await this.msgCommentRepository.findAndCount({
      select: ['id', 'userId', 'articleId', 'commentId', 'createdAt'],
      skip: limit * (page - 1),
      take: limit,
      where: { cId: userId },
      order: { id: 'DESC' },
    });

    const list = await Promise.all(
      msgList.map(async (item) => ({
        id: item.id,
        isRead: item.isRead,
        createdAt: item.createdAt,
        user: await this.userRepository.findOne({
          select: ['id', 'nickName', 'avatar'],
          where: { id: userId },
        }),
        ...(await this.commentRepository.findOne({
          select: ['content'],
          where: { id: item.commentId },
        })),
        article: await this.articleRepository.findOne({
          select: ['id', 'title'],
          where: { id: item.articleId },
        }),
      })),
    );

    return { list, total };
  }

  // 添加评论消息
  async createComment(params: CommentDto) {
    await this.msgCommentRepository.insert(params);
  }

  getSystemList(params: FindMsgListDto) {
    return { total: 0, list: [] };
  }
}
