import { Column, Entity } from 'typeorm';
import { MessageBase } from './messageBase.entity';

// 评论消息
@Entity({ name: 'message_comment' })
export class MessageComment extends MessageBase {
  @Column({
    type: 'int',
    name: 'article_id',
    comment: '评论的文章id',
  })
  public articleId: number;

  @Column({
    type: 'int',
    name: 'comment_id',
    comment: '评论的id',
  })
  public commentId: number;
}
