import { Entity, Column, Index } from 'typeorm';
import { Base } from './base.entity';

// 消息推送通知
export class MessageBase extends Base {
  @Column({
    type: 'int',
    name: 'user_id',
    comment: '当前用户id',
  })
  @Index()
  public userId: number;

  @Column({
    type: 'int',
    name: 'c_id',
    comment: '推送的用户id',
  })
  @Index()
  public cId: number;

  @Column({
    type: 'boolean',
    name: 'is_read',
    comment: '是否阅读 0-未读 1-已读',
    default: false,
  })
  public isRead: boolean;
}
