import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

// 关注
@Entity({ name: 'follow' })
export class Follow extends Base {
  @Column({
    type: 'int',
    nullable: false,
    name: 'follow_id',
    comment: '关注的用户id',
  })
  public followId: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'user_id',
    comment: '当前用户id',
  })
  public userId: number;
}
