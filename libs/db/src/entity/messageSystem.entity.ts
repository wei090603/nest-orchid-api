import { Column, Entity, Index } from 'typeorm';
import { Base } from './base.entity';

// 点赞消息
@Entity({ name: 'message_system' })
export class MessageSystem extends Base {
  @Column({
    type: 'int',
    name: 'c_id',
    comment: '推送的用户id',
  })
  @Index()
  public cId: number;

  @Column({
    name: 'content',
    comment: '消息内容',
    type: 'longtext',
  })
  public content: string;

  @Column({
    type: 'boolean',
    name: 'is_read',
    comment: '是否阅读 0-未读 1-已读',
    default: false,
  })
  public isRead: boolean;
}
