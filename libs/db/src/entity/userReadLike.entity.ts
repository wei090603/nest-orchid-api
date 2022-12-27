import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
import { Base } from './base.entity';

@Entity('user_read_like')
export class UserReadLike extends Base {
  @PrimaryColumn()
  @Column({
    type: 'int',
    unique: true,
    nullable: true,
    name: 'user_id',
    comment: '用户id',
  })
  @Index()
  public userId: number;

  @Column({
    type: 'int',
    name: 'like_total',
    default: 0,
    comment: '文章点赞总数量',
  })
  public likeTotal: number;

  @Column({
    type: 'int',
    name: 'read_total',
    default: 0,
    comment: '文章阅读总数量',
  })
  public readTotal: number;
}
