import { Column, Entity, Index } from 'typeorm';
import { Base } from './base.entity';

// 动态
@Entity({ name: 'dynamic' })
export class Dynamic extends Base {
  @Column({
    type: 'int',
    name: 'type',
    comment: 'type 1-发表文章 2-点赞文章 3-关注用户',
  })
  public type: number;

  @Column({
    type: 'int',
    name: 'user_id',
    comment: '当前用户id',
  })
  @Index()
  public userId: number;

  @Column({
    type: 'int',
    name: 'article_id',
    comment: '当前文章id',
    nullable: true,
  })
  public articleId: number;

  @Column({
    type: 'int',
    name: 'follow_id',
    comment: '当前关注用户id',
    nullable: true,
  })
  public followId: number;
}
