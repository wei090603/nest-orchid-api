import { Column, Entity } from 'typeorm';
import { MessageBase } from './messageBase.entity';

// 点赞消息
@Entity({ name: 'message_like' })
export class MessageLike extends MessageBase {
  @Column({
    type: 'int',
    name: 'article_id',
    comment: '评论的文章id',
  })
  public articleId: number;
}
